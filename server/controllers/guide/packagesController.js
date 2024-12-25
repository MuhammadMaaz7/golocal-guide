// Get all packages

import Package from '../../models/guide/guidePackageModel.js';
export const getAllPackages = async (req, res) => {
  console.log("Get al packages function");
    try {
      const packages = await Package.find();  // Fetch all packages
      res.status(200).json(packages);  // Send the packages in response
    } catch (error) {
      res.status(500).json({ message: "Error fetching packages", error });
    }
  };
  
  // Get a specific package by ID
  export const getPackageById = async (req, res) => {
    console.log("Get package by id: ", req.body);

    try {
      const pkg = await Package.findById(req.params.id);  // Find package by ID
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      console.log("Package found: ", pkg);
      res.status(200).json(pkg);  // Send the package details in response
    } catch (error) {
      res.status(500).json({ message: "Error fetching package", error });
    }
  };
export const addPackage = async (req, res) => {
  console.log("Adding in controller");
  console.log(req.body);

  // Extract the new package details from the request body
  const { title, city, price, availableDates, includedServices, dateField, guideID } = req.body;
console.log("HI");
  try {
    // Create a new package instance with the extracted fields
    const newPackage = new Package({
      guideID, // Pass the guideID from the frontend
      title,
      city,
      price,
      availableDates, // Ensure availableDates are stored as Date objects
      includedServices,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("New packing about to be saved");

    // Save the package to the database
    await newPackage.save();

    // Send the newly created package as a response
    res.status(201).json(newPackage);
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ message: "Error adding package", error });
  }
};

  
  // Update an existing package
  export const updatePackage = async (req, res) => {
    console.log("Updating package......",req);
    try {
      const updatedPackage = await Package.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }  // Return the updated package
      );
      if (!updatedPackage) {
        return res.status(404).json({ message: "Package not found" });
      }
      console.log("Package updated");

      res.status(200).json(updatedPackage);  // Send the updated package in response
    } catch (error) {
      res.status(500).json({ message: "Error updating package", error });
    }
  };
  
  // Delete a package
  export const deletePackage = async (req, res) => {
    console.log("In deleted package func in controller");
    console.log(req.body);
    try {
      const deletedPackage = await Package.findByIdAndDelete(req.params.id);  // Delete package by ID
      if (!deletedPackage) {
        return res.status(404).json({ message: "Package not found" });
      }
      console.log("Package to be deleetd found and deleted");

      res.status(200).json({ message: "Package deleted successfully" });  // Confirm deletion
    } catch (error) {
      res.status(500).json({ message: "Error deleting package", error });
    }
  };
  