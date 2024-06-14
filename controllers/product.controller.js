import prisma from "../utils/prisma.js";
import { convertToISOString } from "../utils/timeConv.js";

export const createProduct = async (req, res) => {
    console.log(req.body);
    const { name, date, quantity, ...others } = req.body 
    const timeProductSold=convertToISOString(date)
    
    try {
        //todo: create and update ProductSoldMonthly
        if (!timeProductSold) { return res.status(404).json("invalid date") }
        const productSoldMonthly = await prisma.productSoldMonthly.upsert({
          where: {
            productCode: others.code,
            date: {
              startsWith: `${new Date(
                timeProductSold
              ).getFullYear()}-${new Date(timeProductSold).getMonth()}`,
            },
          },
            update: {
              quantity
          },
          create: {
              productCode: others.code,
              quantity: parseInt(quantity),
              totalAmount:others.total
          },
        });
         const productSold = await prisma.ProductSoldDaily.create({
           data: {
             name: name.toLowerCase(),
             date: timeProductSold,
             quantity: parseInt(quantity),
             ...others,
           },
         });
       
       if (productSold) {
           console.log(productSold);
           
           return res.status(201).json("product created successfully");
       }
   } catch (error) {
    console.log(error);
    return res.status(500).json("internal Server error")
   }
   
}



