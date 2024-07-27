import User from "@/lib/modals/user";
const jwt = require("jsonwebtoken");
import connect from "@/lib/database/db";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { encrypt, decrypt } from "@/lib/constant";
import { SECRET } from "@/lib/config/config";
import { maxAge } from "@/lib/utils/utils";
const ObjectId = require("mongoose").Types.ObjectId;

const createToken = (id) => {
  return jwt.sign({ id }, SECRET, {
    expiresIn: maxAge,
  });
};

// export const GET = async () => {
//   try {
//     await connect();
//     const users = await User.find();
//     return new NextResponse(JSON.stringify(users), { status: 200 });
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({ error: "Error fetching users", mssg: error.message }),
//       { status: 400 }
//     );
//   }
// };

export const POST = async (request: Request) => {
  try {
    const { email, username, password } = await request.json();
    await connect();

    //check email exist
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return new NextResponse(
        JSON.stringify({ message: "User already exist" }),
        { status: 409 }
      );

    const newUser = new User({ email, username, password: encrypt(password) });
    await newUser.save();

    const token = createToken(newUser._id);

    const userForClient = { ...newUser._doc };
    delete userForClient.password;

    return new NextResponse(
      JSON.stringify({
        message: "User is created",
        user: userForClient,
        token,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating user" + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;
    await connect();

    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({ message: "ID or new username not found" }),
        { status: 400 }
      );
    }
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
        status: 400,
      });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUsername },
      { new: true }
    );
    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        { status: 400 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "User is updated", user: updatedUser }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating user" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "ID not found" }), {
        status: 400,
      });
    }
    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
        status: 400,
      });
    }
    await connect();
    const deletedUser = await User.findByIdAndDelete(
      new Types.ObjectId(userId)
    );

    if (!deletedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        { status: 400 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "User is deleted", user: deletedUser }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting user" + error.message, {
      status: 500,
    });
  }
};
