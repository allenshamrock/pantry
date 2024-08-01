"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    gap: 3,
    display: "flex",
    flexDirection: "column",
  };
  const [itemName, setItemName] = useState("");
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Getting items from the db (GET)
  const updatePantry = async () => {
    //Get a list of items in the pantry
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
    console.log(pantryList);
  };
  useEffect(() => {
    updatePantry();
  }, []);

  //Adding items to the db(POST)
  const addItem = async (item) => {
    // console.log(item);
    const docRef = doc(collection(firestore, "pantry"), item);
    //Check if item already exists
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      console.log(docSnap.data());
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();

    setItemName(""); //Resetting the input field back to an empty string
  };

  //Removing items to the db(DELETE)
  const removeItems = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    updatePantry()
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection={"column"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add item
          </Typography>

          <Stack width={"100%"} direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>

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
          {pantry.map(({ name, count }) => (
            <Box
              key={name}
              width={"100%"}
              minHeight={"150px"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#D1D5DB"}
              paddingX={5}
            >
              <Typography variant="h5" color={"#333"} textAlign={"center"}>
                {/* Capitalizing the first letters of the words  */}
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h5" color={"#333"} textAlign={"center"}>
                quantity:{count}
              </Typography>
              <Button variant="contained" onClick={() => removeItems(name)}>
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
