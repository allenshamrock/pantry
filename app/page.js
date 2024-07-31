"use client";
import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default function Home() {
  const items = [
    "Tomato",
    "Potato",
    "Onions",
    "Kales",
    "Parsley",
    "Corriander",
    "Ginger",
    "Carrot",
    "Cabbage",
  ];

  useEffect(() => {
    const updatePantry = async () => {
      //Get a list of items in the pantry
      const snapshot = query(collection(firestore, "pantry"));
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        pantryList.push(doc.id);
      });
      // console.log(pantryList)

    };
    updatePantry();
  }, []);
  return (
    <Box
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection={"column"}
    >
      <Box border={"1px solid black"}>
        <Box
          width={"800px"}
          height={"70px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"#eb9534"}
        >
          <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
            Pantry Item
          </Typography>
        </Box>
        <Stack width={"800px"} height={"300px"} spacing={2} overflow={"auto"}>
          {items.map((item, index) => (
            <Box
              key={index}
              width={"100%"}
              height={"300px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={"#D1D5DB"}
            >
              <Typography variant="h5" color={"#333"} textAlign={"center"}>
                {/* Capitalizing the first letters of the words  */}
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
