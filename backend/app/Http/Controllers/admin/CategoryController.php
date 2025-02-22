<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    //This method is return all
    public function index() {

        $categories = Category::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => '200',
            'data' => $categories
        ]);
    }

    //This method is store
    public function store(Request $request) {
        $Validator = Validator::make($request->all(), [
            'name' => 'required',
            'status' => 'required'
        ]);

        if ($Validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $Validator->errors()
            ], 400);
        }

        $category = new Category();
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => '200',
            'message' => 'Category added successfully',
            'data' => $category
        ], 200);
    }

    //This method is show one
    public function show($id) {

        $category = Category::find($id);
        
        if ($category == null) {
            return response()->json([
                'status' => '404',
                'message' => 'Category not found',
                'data' => []
            ], status: 404);
        }

        return response()->json([
            'status' => '200',
            'data' => $category
        ]);
    }

    //This method is update one
    public function update($id, Request $request) {

        $category = Category::find($id);
        
        if ($category == null) {
            return response()->json([
                'status' => '404',
                'message' => 'Category not found',
                'data' => []
            ], status: 404);
        }

        $Validator = Validator::make($request->all(), [
            'name' => 'required',
            'status' => 'required'
        ]);

        if ($Validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $Validator->errors()
            ], 400);
        }

        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => '200',
            'message' => 'Category Updated successfully',
            'data' => $category
        ], 200);
    }

    //This method is destroy
    public function destroy($id) {
        
        $category = Category::find($id);
        
        if ($category == null) {
            return response()->json([
                'status' => '404',
                'message' => 'Category not found',
                'data' => []
            ], status: 404);
        }

        $category->delete();
        
        return response()->json([
            'status' => '200',
            'message' => 'Category Delete successfully'
        ], 200);
    }
}
