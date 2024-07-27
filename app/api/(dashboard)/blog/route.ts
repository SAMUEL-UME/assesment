import { NextResponse, NextRequest } from 'next/server'

export const GET = (request: Request)=> {
    return NextResponse.redirect(new URL('/api/blogs', request.url))
}


export const POST = async (request: Request) => {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");
      const { image, title, content, category } = await request.json();
      if (!userId || !Types.ObjectId.isValid(userId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing userId" }),
          { status: 400 }
        );
      }
      //check if category is valid
      // const validCategories = [
      //   "headache",
      //   "kidney",
      //   "stomachche",
      //   "leg pain",
      //   "malaria",
      // ];
      // if (!validCategories.includes(category)) {
      //   return new NextResponse(JSON.stringify({ message: "Invalid category" }), {
      //     status: 400,
      //   });
      // }
  
      await connect();
  
      const user = await User.findById(userId);
      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }
  
      const newBlog = new Blog({
        image,
        title,
        content,
        category,
        user: new Types.ObjectId(userId),
      });
  
      await newBlog.save();
  
      return new NextResponse(
        JSON.stringify({ message: "Post created successfully", blog: newBlog }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse("Error in creating Post" + error.message, {
        status: 500,
      });
    }
  };