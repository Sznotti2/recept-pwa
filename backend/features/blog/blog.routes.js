const express = require('express');
const router = express.Router();
const { createBlog, updateBlog, deleteBlog, getAllBlogs, getBlogById, searchBlog } = require('./blog.service');
const verifyToken = require('../../middleware/authJWT');

router.post("/", verifyToken, createBlog);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.get("/", getAllBlogs);
// router.get("/:id", getBlogById);
// router.get("/search", searchBlog);

module.exports = router;