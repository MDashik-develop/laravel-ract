<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    //This mehtod is return all products
    public function index() {
        $products = Product::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => '200',
            'data' => $products
        ], 200);
    }

    //This mehtod is store product
    public function store(Request $request) {
        //validate request
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $validator->errors()
            ], 400);
        }

        //store product
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->barcode = $request->barcode;
        $product->save();


        // Save product images
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                // large thumbnail
                $extArray = explode('.',$tempImage->name);
                $ext = end($extArray);

                $imageName = $product->id.'-'.time().'.'.$ext;
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/'.$tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/'.$imageName));

                // small thumbnail
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/'. $tempImage->name));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/'. $imageName));

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }


        return response()->json([
            'status' => '200',
            'message' => 'product added successfully'
        ], 200);
    }

    //This mehtod is show one product
    public function show($id) {

        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => '404',
                'message' => 'product not found'
            ], 404);
        }

        return response()->json([
            'status' => '200',
            'data' => $product
        ], 200);
    }

    //This mehtod is update product
    public function update(Request $request, $id) {

        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => '404',
                'message' => 'product not found'
            ], 404);
        }

        //validate request
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku,$id,id',
            'is_featured' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => '400',
                'errors' => $validator->errors()
            ], 400);
        }

        //update product
        $product->title = $request->title;
        $product->price = $request->price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->barcode = $request->barcode;
        $product->save();

        return response()->json([
            'status' => '200',
            'message' => 'product updated successfully'
        ], 200);
    }

    //This mehtod is delete product
    public function destroy($id) {

        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => '404',
                'message' => 'product not found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => '200',
            'message' => 'product deleted successfully'
        ], 200);
    }
}
