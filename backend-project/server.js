const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const app = express();

// ======================================
// MIDDLEWARE
// ======================================
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(session({
    secret: "bms_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// ======================================
// MYSQL CONNECTION
// ======================================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bms"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

// ======================================
// AUTH APIs
// ======================================

// REGISTER
app.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users(username, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [username, email, hashedPassword],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "User registered successfully"
                });
            }
        );

    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN
// LOGIN WITH USERNAME + PASSWORD
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE username = ?
    `;

    db.query(sql, [username], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.status(401).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid password"
            });
        }

        req.session.user = {
            userid: user.userid,
            username: user.username
        };

        res.json({
            message: "Login successful",
            user: req.session.user
        });

    });

});

// LOGOUT
app.get("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Logout successful"
        });
    });
});

// CURRENT USER
app.get("/me", (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({
            message: "Not authenticated"
        });
    }

    res.json(req.session.user);
});

// ======================================
// CUSTOMER CRUD APIs
// ======================================

// GET ALL CUSTOMERS
app.get("/customers", (req, res) => {

    const sql = `SELECT * FROM customer ORDER BY customerid DESC`;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// GET SINGLE CUSTOMER
app.get("/customers/:id", (req, res) => {

    const sql = `SELECT * FROM customer WHERE customerid = ?`;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
});

// INSERT CUSTOMER
app.post("/customers", (req, res) => {

    const {
        firstname,
        lastname,
        gender,
        telephone,
        address,
        registrationdate
    } = req.body;

    const sql = `
        INSERT INTO customer(
            firstname,
            lastname,
            gender,
            telephone,
            address,
            registrationdate
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            firstname,
            lastname,
            gender,
            telephone,
            address,
            registrationdate
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Customer added successfully"
            });
        }
    );
});

// UPDATE CUSTOMER
app.put("/customers/:id", (req, res) => {

    const {
        firstname,
        lastname,
        gender,
        telephone,
        address,
        registrationdate
    } = req.body;

    const sql = `
        UPDATE customer SET
        firstname=?,
        lastname=?,
        gender=?,
        telephone=?,
        address=?,
        registrationdate=?
        WHERE customerid=?
    `;

    db.query(
        sql,
        [
            firstname,
            lastname,
            gender,
            telephone,
            address,
            registrationdate,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Customer updated successfully"
            });
        }
    );
});

// DELETE CUSTOMER
app.delete("/customers/:id", (req, res) => {

    const sql = `DELETE FROM customer WHERE customerid=?`;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Customer deleted successfully"
        });
    });
});

// ======================================
// PRODUCT CRUD APIs
// ======================================

// GET ALL PRODUCTS
app.get("/products", (req, res) => {

    const sql = `SELECT * FROM product ORDER BY productcode DESC`;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// GET SINGLE PRODUCT
app.get("/products/:id", (req, res) => {

    const sql = `SELECT * FROM product WHERE productcode=?`;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
});

// INSERT PRODUCT
app.post("/products", (req, res) => {

    const {
        productname,
        category,
        price,
        quantity,
        supplier,
        addeddate
    } = req.body;

    const sql = `
        INSERT INTO product(
            productname,
            category,
            price,
            quantity,
            supplier,
            addeddate
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            productname,
            category,
            price,
            quantity,
            supplier,
            addeddate
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Product added successfully"
            });
        }
    );
});

// UPDATE PRODUCT
app.put("/products/:id", (req, res) => {

    const {
        productname,
        category,
        price,
        quantity,
        supplier,
        addeddate
    } = req.body;

    const sql = `
        UPDATE product SET
        productname=?,
        category=?,
        price=?,
        quantity=?,
        supplier=?,
        addeddate=?
        WHERE productcode=?
    `;

    db.query(
        sql,
        [
            productname,
            category,
            price,
            quantity,
            supplier,
            addeddate,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Product updated successfully"
            });
        }
    );
});

// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {

    const sql = `DELETE FROM product WHERE productcode=?`;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Product deleted successfully"
        });
    });
});

// ======================================
// SALE CRUD APIs
// ======================================

// GET ALL SALES WITH JOIN
app.get("/sales", (req, res) => {

    const sql = `
        SELECT
            s.saleid,
            c.firstname,
            c.lastname,
            p.productname,
            s.quantitysold,
            s.unitprice,
            s.totalamount,
            s.saledate,
            s.paymentstatus
        FROM sale s
        JOIN customer c
        ON s.customerid = c.customerid
        JOIN product p
        ON s.productcode = p.productcode
        ORDER BY s.saleid DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// GET SINGLE SALE
app.get("/sales/:id", (req, res) => {

    const sql = `
        SELECT * FROM sale
        WHERE saleid=?
    `;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
});

// INSERT SALE
app.post("/sales", (req, res) => {

    const {
        customerid,
        productcode,
        quantitysold,
        unitprice,
        saledate,
        paymentstatus
    } = req.body;

    const totalamount =
        quantitysold * unitprice;

    const sql = `
        INSERT INTO sale(
            customerid,
            productcode,
            quantitysold,
            unitprice,
            totalamount,
            saledate,
            paymentstatus
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            customerid,
            productcode,
            quantitysold,
            unitprice,
            totalamount,
            saledate,
            paymentstatus
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            // UPDATE PRODUCT QUANTITY
            const updateQty = `
                UPDATE product
                SET quantity = quantity - ?
                WHERE productcode = ?
            `;

            db.query(
                updateQty,
                [quantitysold, productcode]
            );

            res.json({
                message: "Sale added successfully"
            });
        }
    );
});

// UPDATE SALE
app.put("/sales/:id", (req, res) => {

    const {
        customerid,
        productcode,
        quantitysold,
        unitprice,
        saledate,
        paymentstatus
    } = req.body;

    const totalamount =
        quantitysold * unitprice;

    const sql = `
        UPDATE sale SET
        customerid=?,
        productcode=?,
        quantitysold=?,
        unitprice=?,
        totalamount=?,
        saledate=?,
        paymentstatus=?
        WHERE saleid=?
    `;

    db.query(
        sql,
        [
            customerid,
            productcode,
            quantitysold,
            unitprice,
            totalamount,
            saledate,
            paymentstatus,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Sale updated successfully"
            });
        }
    );
});

// DELETE SALE
app.delete("/sales/:id", (req, res) => {

    const sql = `DELETE FROM sale WHERE saleid=?`;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Sale deleted successfully"
        });
    });
});

// ======================================
// REPORT APIs
// ======================================

// DASHBOARD REPORT
app.get("/reports/summary", (req, res) => {

    const report = {};

    const customers = `
        SELECT COUNT(*) AS totalCustomers
        FROM customer
    `;

    const products = `
        SELECT COUNT(*) AS totalProducts
        FROM product
    `;

    const sales = `
        SELECT COUNT(*) AS totalSales
        FROM sale
    `;

    const revenue = `
        SELECT IFNULL(SUM(totalamount),0)
        AS totalRevenue
        FROM sale
    `;

    db.query(customers, (err, customerResult) => {

        if (err) {
            return res.status(500).json(err);
        }

        report.totalCustomers =
            customerResult[0].totalCustomers;

        db.query(products, (err, productResult) => {

            if (err) {
                return res.status(500).json(err);
            }

            report.totalProducts =
                productResult[0].totalProducts;

            db.query(sales, (err, salesResult) => {

                if (err) {
                    return res.status(500).json(err);
                }

                report.totalSales =
                    salesResult[0].totalSales;

                db.query(revenue, (err, revenueResult) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    report.totalRevenue =
                        revenueResult[0].totalRevenue;

                    res.json(report);
                });
            });
        });
    });
});

// SALES REPORT
app.get("/reports/sales", (req, res) => {

    const sql = `
        SELECT
            s.saleid,
            c.firstname,
            c.lastname,
            p.productname,
            s.quantitysold,
            s.unitprice,
            s.totalamount,
            s.saledate,
            s.paymentstatus
        FROM sale s
        JOIN customer c
        ON s.customerid = c.customerid
        JOIN product p
        ON s.productcode = p.productcode
        ORDER BY s.saleid DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// MONTHLY SALES CHART
app.get("/reports/monthly-sales", (req, res) => {

    const sql = `
        SELECT
            MONTHNAME(saledate) AS month,
            SUM(totalamount) AS total
        FROM sale
        GROUP BY MONTH(saledate)
        ORDER BY MONTH(saledate)
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// ======================================
// SERVER
// ======================================
app.listen(5000, () => {
    console.log("Server running on port 5000");
});