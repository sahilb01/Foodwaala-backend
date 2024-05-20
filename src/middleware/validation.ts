import { Request,Response,NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors=async(req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}

export const validateMyUserrequest=[
  
   body("name").isString().notEmpty().withMessage("Name must be a non-empty string"),
   body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be a non-empty string"),
   body("city").isString().notEmpty().withMessage("City must be a non-empty string"),
   body("country").isString().notEmpty().withMessage("Country must be a non-empty string"),
   handleValidationErrors,
]
export const validateMyRestaurantRequest=[
    body("restaurantName").notEmpty().withMessage("Restaurant Name is Required!"),
    body("city").notEmpty().withMessage("City is Required!"),
    body("country").notEmpty().withMessage("Country Name is Required!"),
    body("deliveryPrice").isFloat({min:0}).withMessage("Delivery Price must be a Positive Number!"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated DeliveryTime must be a positive Integer"),
    body("cuisines").isArray().withMessage("Cuisines must be an array!").not().isEmpty().withMessage("Cuisine array cannot be empty!"),
    body("menuItems").isArray().withMessage("Menu Items must be an array!"),
    body("menuItems.*.name").notEmpty().withMessage("Menu Item name is required"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("Menu Price name is required and must be a number"),
    handleValidationErrors,

]