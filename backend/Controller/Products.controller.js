const ProductsModel = require("../models/Products.model");
//Function that creates Products and stores into database


const CreateProduct = async(req, res) => {
    const product = req.body;

    try {
        if (
            product.productName &&
            product.price &&
            product.description &&
            product.imgUrl
        ) {
            const productsList = new ProductsModel({
                productName: product.productName,
                price: product.price,
                description: product.description,
                imgUrl: product.imgUrl,
            });
            const productsData = await productsList.save();

            res.status(201).json({
                message: "Product added Succesfully",
                productId: productsData._id,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error,
            productId: [],
        });
    }
};
//Function that gets all product from database
const getAllProducts = async(req, res) => {
    try {
        const products = await ProductsModel.find();
        const filteredProductsData = products.map((product) => {
            return {
                productName: product.productName,
                description: product.description,
                price: product.price,
                imgUrl: product.imgUrl,
                id: product._id,
            };
        });

        res.json({
            message: "Products fetched Suceesfully",
            products: filteredProductsData,
        });
    } catch (error) {
        res.json({
            message: error,
            products: [],
        });
    }
};
//Function that gets single product by id from database
const getSingleProduct = async(req, res, next) => {
    console.log(req.params.singleProductId);
    try {
        const product = await ProductsModel.findById(req.params.singleProductId);
        if (product) {
            const singleProduct = {
                productName: product.productName,
                description: product.description,
                price: product.price,
                imgUrl: product.imgUrl,
                id: product._id,
            };
            res
                .status(200)
                .json({ message: "Product Found", product: singleProduct });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.json({
            message: error,
            product: [],
        });
    }
};
//Function that update single product by id from database
const UpdateSingleProduct = async(req, res, next) => {
    const product = req.body;
    const updatedProduct = new ProductsModel({
        productName: product.productName,
        price: product.price,
        description: product.description,
        imgUrl: product.imgUrl,
        _id: product.id,
    });
    try {
        await ProductsModel.updateOne({ _id: req.params.id }, updatedProduct);

        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.json({ message: error });
    }
};
//Function that deletes single product by id from database
const deleteSingleProduct = async(req, res, next) => {
    try {
        await ProductsModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "Product Succesfully deleted",
        });
    } catch (error) {
        res.status(200).json({
            message: error,
        });
    }
};
module.exports = {
    CreateProduct,
    getAllProducts,
    getSingleProduct,
    UpdateSingleProduct,
    deleteSingleProduct,
};