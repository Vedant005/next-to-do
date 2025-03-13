import { connect } from "@/dbConfig/dbConfig";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

//create
//change
//delete
//edit

export async function POST(request: NextRequest) {
  await connect();
  try {
    const { title } = await request.json();
    if (!title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTodo = new Todo({ title, isCompleted: false });
    const savedTodo = await newTodo.save();

    return NextResponse.json({
      message: "Todo created successfully",
      success: true,
      savedTodo,
    });
  } catch (error: any) {
    console.error("Error in POST /api/todos:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  await connect();
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");

    const todo = await Todo.findById(_id);

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    return NextResponse.json({ message: "Todo status changed", success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  await connect();
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");

    const { title } = await request.json();

    const updatedTodo = await Todo.findByIdAndUpdate(
      _id,
      { title },
      { new: true }
    );

    if (!updatedTodo)
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    return NextResponse.json({ message: "Todo updated", updatedTodo });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connect();
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");

    if (!_id) {
      return NextResponse.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    const deletedTodo = await Todo.findByIdAndDelete(_id);

    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connect();

    const todos = await Todo.find();
    return NextResponse.json({ success: true, todos });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}
