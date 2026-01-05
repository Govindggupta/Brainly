import { Request, Response, Router } from "express";
import { UserModel } from "../models/user.model";
import { z } from "zod";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { authMiddleware } from "../middleware/middleware";
import { ContentModel } from "../models/content.model";
import { tr } from "zod/v4/locales";
import { random } from "../utils/utils";
import { LinksModel } from "../models/links.model";

export const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const userSchema = z.object({
      username: z.string().min(3).max(10),
      //Password should be 8 to 20 letters, should have atleast one uppercase, one lowercase, one special character, one number
      password: z
        .string()
        .min(3)
        .max(10)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character"
        ),
    });

    const userData = userSchema.parse(req.body);

    if (!userData) {
      res.status(411).json({ error: "Invalid request body" });
    }

    const sameuser = await UserModel.findOne({ username: userData.username });

    if (sameuser) {
      res.status(403).json({ error: "Username already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      const newUser = await UserModel.create(userData);

      res.status(200).json({
        username: newUser.username,
        password: newUser.password,
      });
    } catch (error) {
      res.status(409).json({
        error: "Error Creating User",
        errorMessage: error.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Invalid request body", errorMessage: error.message });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const userSchema = z.object({
      username: z.string().min(3).max(10),
      password: z.string().min(3).max(10),
    });

    const userData = userSchema.parse(req.body);

    if (!userData) {
      res.status(411).json({ error: "Invalid request body" });
    }

    const user = await UserModel.findOne({ username: userData.username });

    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
    }

    try {
      const isPasswordCorrect = await bcrypt.compare(
        userData.password,
        user.password
      );

      if (!isPasswordCorrect) {
        res.status(401).json({ error: "Invalid username or password" });
      }

      const token = jsonwebtoken.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({
        error: "Error Generating JWT",
        errorMessage: error.message,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Invalid request body", errorMessage: error.message });
  }
});

router.post("/content", authMiddleware, async (req: Request, res: Response) => {
  try {
    const contentSchema = z.object({
      link: z.string(),
      title: z.string(),
      type: z.enum(["image", "video", "article", "audio"]),
    });

    const contentData = contentSchema.parse(req.body);

    const newContent = await ContentModel.create({
      ...contentData,
      // @ts-ignore
      userId: req.user._id,
    });

    res.status(200).json({ content: newContent });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Invalid request body", errorMessage: error.message });
  }
});

router.get("/content", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const contents = await ContentModel.find({ userId: req.user._id });
    res.status(200).json({ contents });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching contents", errorMessage: error.message });
  }
});

router.delete("/content",authMiddleware,  async (req, res) => {
  try {
    try {
      const deletedContent = await ContentModel.findOneAndDelete({
        _id: req.body.contentId,
        // @ts-ignore
        userId: req.user._id,
      });
      if (!deletedContent) {
        res.status(404).json({ error: "Content not found" });
      }
      res.status(200).json({ deletedContent });
    } catch (error) {
      res
        .status(323)
        .json({ error: "Error deleting content", errorMessage: error.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting content", errorMessage: error.message });
  }
});

router.post("/brain/share", authMiddleware, async (req, res) => {
  try {
    const share = req.body.share;
    if (share) {
      //@ts-ignore
      const existingLink = await LinksModel.findOne({ userId: req.user._id });

      if (existingLink) {
        res.status(409).json({ hash: existingLink.hash });
      } else {
        const shareHash = random(10);
        await LinksModel.create({
          hash: shareHash,
          // @ts-ignore
          userId: req.user._id,
        });

        res.status(200).json({ share: shareHash });
      }
    } else {
      await LinksModel.deleteOne({
        // @ts-ignore
        userId: req.user._id,
      });

      res.status(200).json({ message: "Share link deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/brain/:sharelink", async (req, res) => {
  try {
    const shareLink = req.params.sharelink;

    const links = await LinksModel.findOne({ hash: shareLink });

    if (!links) {
      res.status(404).json({ error: "Share link not found" });
    }

    const content = await ContentModel.find({ userId: links.userId })

    const user = await UserModel.findOne({
      _id : links.userId,
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ username: user.username, content: content });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// req and res in ts manner
