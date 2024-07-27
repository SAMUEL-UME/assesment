import { NextResponse } from "next/server";
import connect from "@/lib/database/db";
import Blog from "@/lib/modals/blog";
import { Types } from "mongoose";


export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const searchKeywords = searchParams.get("keywords") as string;
    const category = searchParams.get("category");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page: any = parseInt(searchParams.get("page") || "1");
    const limit: any = parseInt(searchParams.get("limit") || "10");

    await connect();

    const filter: any = {};
    if (category) {
      filter.category = category;
    }

    if (searchKeywords) {
      filter.$or = [
        {
          title: { $regex: searchKeywords, $options: "i" },
        },
        {
          description: { $regex: searchKeywords, $options: "i" },
        },
      ];
    }
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
      };
    } else if (endDate) {
      filter.createdAt = {
        $lte: new Date(endDate),
      };
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(filter)
      .sort({ createdAt: "asc" })
      .skip(skip)
      .limit(limit);

    return new NextResponse(JSON.stringify({ blogs }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in fetching Posts" + error.message, {
      status: 500,
    });
  }
};


