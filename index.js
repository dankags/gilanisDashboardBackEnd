import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import dashboardRoutes from "./routes/dashboard.route.js"
import category from "./routes/category.route.js"
import user from "./routes/user.route.js";
import product from "./routes/product.route.js"
import sale from "./routes/sale.route.js"
import companyProduct from "./routes/companyProduct.route.js"
import productSoldMonthly from "./routes/productMonthly.route.js"

dotenv.config();

const port = 8000;
const app = express();

// app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/dashboard", dashboardRoutes)
app.use("/api/category", category);
app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/sales", sale);
app.use("/api/companyProduct", companyProduct);
app.use("/api/productSoldMonthly",productSoldMonthly)


app.listen(port,()=> {
    console.log(`Backend is running on port : ${port}`);
    
})