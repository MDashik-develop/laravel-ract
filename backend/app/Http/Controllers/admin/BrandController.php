<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    //This method is return all
    public function index() {

        $brands = Brand::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => '200',
            'data' => $brands
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

        $brand = new Brand();
        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => '200',
            'message' => 'brand added successfully',
            'data' => $brand
        ], 200);
    }

    //This method is show one
    public function show($id) {

        $brand = Brand::find($id);

        if ($brand == null) {
            return response()->json([
                'status' => '404',
                'message' => 'brand not found',
                'data' => []
            ], status: 404);
        }

        return response()->json([
            'status' => '200',
            'data' => $brand
        ]);
    }

    //This method is update one
    public function update($id, Request $request) {

        $brand = Brand::find($id);

        if ($brand == null) {
            return response()->json([
                'status' => '404',
                'message' => 'brand not found',
                'data' => []
            ], status: 404);
        }

        $Validator = Validator::make($request->all(), [
            'name' => 'required',
            'status' => 'required',
        ]);

        if ($Validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $Validator->errors()
            ], 400);
        }

        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => '200',
            'message' => 'brand Updated successfully',
            'data' => $brand
        ], 200);
    }

    //This method is destroy
    public function destroy($id) {

        $brand = Brand::find($id);

        if ($brand == null) {
            return response()->json([
                'status' => '404',
                'message' => 'brand not found',
                'data' => []
            ], status: 404);
        }

        $brand->delete();

        return response()->json([
            'status' => '200',
            'message' => 'brand Delete successfully'
        ], 200);
    }
}
