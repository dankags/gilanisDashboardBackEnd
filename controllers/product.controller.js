import prisma from "../utils/prisma.js";
import { getStartAndEndDate } from "../utils/startEndmonth.js";
import { convertToISOString } from "../utils/timeConv.js";

export const createProduct = async (req, res) => {
    
 const { name, date, quantity, ...others } = req.body 
 const timeProductSold = convertToISOString(date)
 const rangeDates=getStartAndEndDate(timeProductSold)
  
    try {
        
        if (!timeProductSold) { return res.status(404).json("invalid date") }
      const productSoldMonthlyId = await prisma.productSoldMonthly.findFirst({
        where: {
          productCode: others.code,
          date: {
            gte: rangeDates.startDate,
            lt: rangeDates.endDate
          },
        },
        select: {
          id:true
        }
      })
      if (others.type === "REFUND") {
          await prisma.productSoldMonthly.upsert({
            where: {
              id: productSoldMonthlyId ? productSoldMonthlyId.id : "",
            },
            update: {
              quantity: {
                decrement: parseInt(quantity),
              },
              totalAmount: {
                decrement: parseFloat(others.total),
              },
            },
            create: {
              productCode: others.code,
              quantity: 0,
              totalAmount: 0,
              date: rangeDates.startDate,
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
              return res.status(201).json("product created successfully");
            }
      } 
       if (others.type === "VOID") {
         const productSold = await prisma.ProductSoldDaily.create({
           data: {
             name: name.toLowerCase(),
             date: timeProductSold,
             quantity: parseInt(quantity),
             ...others,
           },
         });

         if (productSold) {
           return res.status(201).json("product created successfully");
         }
       } 
      const productSoldMonthly = await prisma.productSoldMonthly.upsert({
        where: {
          id: productSoldMonthlyId ? productSoldMonthlyId.id : "",
        },
        update: {
          quantity: {
            increment: parseInt(quantity),
          },
          totalAmount: {
            increment: parseFloat(others.total)
          },
        },
        create: {
          productCode: others.code,
          quantity: parseInt(quantity),
          totalAmount: parseFloat(others.total),
          date: rangeDates.startDate
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
           return res.status(201).json("product created successfully");
       }
   } catch (error) {
    return res.status(500).json("internal Server error")
   }
   
}

export const createManyProducts = async (req, res) => {
  const {products}=req.body
  try {
    if (!products) { return res.status(400).json("you did not provide the products") }
    products.forEach(async(element) => {
       const { name, date, quantity, ...others } = element;
       const timeProductSold = convertToISOString(date);
      const rangeDates = getStartAndEndDate(timeProductSold);
      
          if (!timeProductSold) { return res.status(404).json("invalid date") }
      const productSoldMonthlyId = await prisma.productSoldMonthly.findFirst({
        where: {
          productCode: others.code,
          date: {
            gte: rangeDates.startDate,
            lt: rangeDates.endDate
          },
        },
        select: {
          id:true
        }
      })
        if (others.type === "REFUND") {
             await prisma.productSoldMonthly.upsert({
               where: {
                 id: productSoldMonthlyId ? productSoldMonthlyId.id : "",
               },
               update: {
                 quantity: {
                   decrement: parseInt(quantity),
                 },
                 totalAmount: {
                   decrement: parseFloat(others.total),
                 },
               },
               create: {
                 productCode: others.code,
                 quantity: 0,
                 totalAmount: 0,
                 date: rangeDates.startDate,
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
               return 
             }
           }
        if (others.type === "VOID") {
             const productSold = await prisma.ProductSoldDaily.create({
               data: {
                 name: name.toLowerCase(),
                 date: timeProductSold,
                 quantity: parseInt(quantity),
                 ...others,
               },
             });

             if (productSold) {
               return res.status(201).json("product created successfully");
             }
           } 
      const productSoldMonthly = await prisma.productSoldMonthly.upsert({
        where: {
          id: productSoldMonthlyId ? productSoldMonthlyId.id : "",
        },
        update: {
          quantity: {
            increment: parseInt(quantity),
          },
          totalAmount: {
            increment: parseFloat(others.total)
          },
        },
        create: {
          productCode: others.code,
          quantity: parseInt(quantity),
          totalAmount: parseFloat(others.total),
          date: rangeDates.startDate
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
       
      return 
    });
    return res.status(201).json("Products created successfully")
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}





