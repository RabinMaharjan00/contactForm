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
    res.status(200).json({ message: "Data successfully saved", status: 200 });
    const contactData = req.body;
    value.push(contactData);
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