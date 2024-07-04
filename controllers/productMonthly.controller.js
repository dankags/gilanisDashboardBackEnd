import { getStartAndEndDateYearUTC } from "../utils/getByYear.js";
import { getStartAndEndDateUTC } from "../utils/monthYear.js";
import prisma from "../utils/prisma.js";

export const getFiveBestSaling = async (req, res) => {
  const rangeDates = getStartAndEndDateUTC(req.query.date);

  try {
    const productsSoldThatMonth = await prisma.ProductSoldMonthly.findMany({
      where: {
        date: {
          gte: rangeDates.startDate,
          lt: rangeDates.endDate,
        },
      },
      select: {
        productCode: true,
        quantity: true,
        companyProduct: {
          select: {
            name: true,
          },
        },
      },
    });
    if (productsSoldThatMonth?.length === 0 || !productsSoldThatMonth) {
      return res.status(404).json("No products sold this month yet.");
    }
    const sortedProducts = productsSoldThatMonth.sort(
      (a, b) => b.quantity - a.quantity
    );
    const topFiveBestSales = sortedProducts.slice(0, 5);
    if (topFiveBestSales) {
      return res.status(200).json(topFiveBestSales);
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

export const getDataByYear = async (req, res) => {
  // console.log(req.params.productId,req.query.year)
  // const rangeDates = getStartAndEndDateYearUTC(req.query.year);
  try {
    const productYearSale = await prisma.productSoldMonthly.findMany({
      where: {
        productCode: req.params.productId,
        date: {
          gte: `${req.query.year}-01-01T00:00:00.000Z`,
          lt: `${parseInt(req.query.year)+1}-01-01T00:00:00.000Z`,
        },
      },
      select: {
        id: true,
        totalAmount: true,
        quantity: true,
        date: true,
        companyProduct: {
          select: {
            name: true,
          },
        },
      },
    });
    
    if (productYearSale?.length === 0 || !productYearSale) {
      return res.status(404).json("No products sold this year yet.");
    }

    return res.status(200).json(productYearSale);

  } catch (error) {
    console.log(error);
      return res.status(500).json("Internal server error");
  }
}
