import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/firebaseconfig"; // Import your Firebase configuration
import { collection, addDoc } from "firebase/firestore";

// API route for registering a user (college in this case)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {  name, otherDetails } = req.body;

    try {
      // Add new college to the 'users' collection in Firestore
      const docRef = await addDoc(collection(db, "users"), {      
        name,       // College name
        otherDetails, // Includes password for now
        createdAt: new Date(),
      });

      return res.status(200).json({ message: "College registered successfully!", id: docRef.id });
    } catch (error) {
      console.error("Error adding document: ", error);
      return res.status(500).json({ message: "Failed to register college." });
    }
  } else {
    // Handle any other HTTP method
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
