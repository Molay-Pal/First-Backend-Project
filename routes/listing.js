const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/search",wrapAsync(listingController.searchListings))

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

router
    .route("/")
    //Index Route
    .get(wrapAsync(listingController.index))
    //create route
    .post( isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createNewListing));

router
    .route("/:id")
    //show route
    .get(wrapAsync(listingController.showListing))
    //update route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    //delete listing route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))
    

module.exports=router;