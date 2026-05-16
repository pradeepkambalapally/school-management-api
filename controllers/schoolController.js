const db = require('../db');

exports.addSchool = (req, res) => {
    const {name, address, latitude, longitude} = req.body;

    if(!name || !address || latitude == null || longitude == null){
        return res.status(400).json({
            message : "All fields are required",
            success : true
        })
    }

    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, address, latitude, longitude],
        (err, result) => {
            if(err){
                return res.status(500).json({
                    message : "Database error",
                    success : false
                })
            }

            res.status(201).json({
                message : "School added successfully",
                success : true
            })
        }
    )
}


