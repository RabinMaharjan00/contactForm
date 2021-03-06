import express from 'express'

const router = express.Router();

let value = []
router.get("/contact", (req, res) => {
  res.status(200).json({
    data:value,
    message:"Data successfully retrived",
    status: 200
  });
});

router.post("/contact", (req,res) => {
  const contactData = req.body;
  const newValue = {
    id:contactData.id,
    name:contactData.name,
    address:contactData.address,
    email:contactData.email,
    phoneNumber:contactData.phoneNumber,
    active:contactData.active
  }
  if(!newValue.name || !newValue.phoneNumber ) {
    return res.status(400).json({message:"Please enter name and phoneNumber"})
  }
  value.push(contactData);
  res.status(200).json({ data:value, message: "Data successfully saved", status: 200 });
})

router.put("/contact/:id", (req,res) => {
  const foundIndex = value.some(index => index.id === req.params.id)
  if(foundIndex) {
    const updateValue = req.body;
    value.forEach((data) => {
      if(data.id === req.params.id) {
        data.name = updateValue.name?updateValue.name:data.name
        data.address = updateValue.address ? updateValue.address : data.address;
        data.email = updateValue.email ? updateValue.email : data.email;
        data.phoneNumber = updateValue.phoneNumber ? updateValue.phoneNumber : data.phoneNumber;
        data.active = updateValue.active ? updateValue.active : data.active;
        res.json({
          data:value,
          message:"Data is successfully updated",
          status:200
        })
      }
    })
  } else {
    res.status(400).json({message:`No contact information with id of ${req.params.id} is found`})
  }
})

router.delete("/contact/:id", (req, res) => {
  const {id} = req.params;
  const dataIndex = value.findIndex(index => index.id === id)
  value.splice(dataIndex,1)
  res.status(200).json({
    data:value,
    message:"Data is successfully Deleted",
    status:200
  })
})

export default router