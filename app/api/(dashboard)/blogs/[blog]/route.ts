import { NextResponse } from "next/server";
import connect from "@/lib/database/db";
import Blog from "@/lib/modals/blog";
import { Types } from "mongoose";


export const GET = async (context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing blogId" }),
        { status: 400 }
      );
    }
    await connect();

    const blog = await Blog.findOne({
      _id: blogId,
    });

    if (!blog) {
      return new NextResponse(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ blog }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in fetching a Post" + error.message, {
      status: 500,
    });
  }
};
