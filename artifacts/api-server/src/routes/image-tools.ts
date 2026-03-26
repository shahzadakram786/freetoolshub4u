import { Router, type IRouter } from "express";
import { RemoveBgBody, RemoveBgResponse, EraseObjectBody, EraseObjectResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/image/remove-bg", async (req, res) => {
  const body = RemoveBgBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "imageBase64 and mimeType are required" });
    return;
  }

  const { imageBase64, mimeType } = body.data;
  const apiKey = process.env.REMOVE_BG_API_KEY;

  if (!apiKey) {
    res.status(503).json({
      error: "Background removal requires an API key. Please add REMOVE_BG_API_KEY in the Secrets panel to enable this feature. Get a free key at remove.bg"
    });
    return;
  }

  try {
    const imageBuffer = Buffer.from(imageBase64, "base64");

    const formData = new FormData();
    const blob = new Blob([imageBuffer], { type: mimeType });
    formData.append("image_file", blob, "image.png");
    formData.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      req.log.error({ status: response.status, body: errText }, "Remove.bg API error");
      res.status(500).json({ error: "Background removal failed. Please try again." });
      return;
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    const resultBase64 = resultBuffer.toString("base64");

    const result = RemoveBgResponse.parse({
      resultBase64,
      mimeType: "image/png",
    });

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Remove BG error");
    res.status(500).json({ error: "Image processing failed" });
  }
});

router.post("/image/erase-object", async (req, res) => {
  const body = EraseObjectBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "imageBase64, maskBase64, and mimeType are required" });
    return;
  }

  const { imageBase64, maskBase64, mimeType } = body.data;
  const replicateToken = process.env.REPLICATE_API_TOKEN;

  if (!replicateToken) {
    res.status(503).json({
      error: "Object eraser requires an API key. Please add REPLICATE_API_TOKEN in the Secrets panel. Get a free token at replicate.com"
    });
    return;
  }

  try {
    const imageDataUrl = `data:${mimeType};base64,${imageBase64}`;
    const maskDataUrl = `data:image/png;base64,${maskBase64}`;

    const createResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${replicateToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "e1c3b33bae8e5c87e4d1b5b62c39ad8e5e3cf9a3c08e785c2a5edde8f1f40a4e",
        input: {
          image: imageDataUrl,
          mask: maskDataUrl,
        },
      }),
    });

    if (!createResponse.ok) {
      res.status(500).json({ error: "Inpainting service unavailable. Please try again." });
      return;
    }

    const prediction = await createResponse.json() as { id: string; status: string; output?: string | string[] };
    let attempts = 0;
    let resultUrl: string | null = null;

    while (attempts < 30 && !resultUrl) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: { "Authorization": `Bearer ${replicateToken}` },
      });
      const polled = await pollResponse.json() as { status: string; output?: string | string[] };

      if (polled.status === "succeeded") {
        resultUrl = Array.isArray(polled.output) ? polled.output[0] : polled.output || null;
        break;
      } else if (polled.status === "failed") {
        break;
      }
      attempts++;
    }

    if (!resultUrl) {
      res.status(500).json({ error: "Object removal timed out. Please try with a smaller image." });
      return;
    }

    const imageRes = await fetch(resultUrl);
    const imgBuffer = Buffer.from(await imageRes.arrayBuffer());
    const resultBase64 = imgBuffer.toString("base64");

    const result = EraseObjectResponse.parse({
      resultBase64,
      mimeType: "image/png",
    });

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Erase object error");
    res.status(500).json({ error: "Object removal failed" });
  }
});

export default router;
