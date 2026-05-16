const db = require('../db');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    
    const dLat = (lat2 - lat1) * (Math.PI / 180);

    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

const addSchool = (req, res) => {
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

const listSchools = (req, res) => {
    const {latitude, longitude} = req.query;

    if(!latitude || !longitude){
        return res.status(400).json({
            message : "Latitude and Longitude required",
            success : false
        })
    }

    db.query("SELECT * FROM schools", (err, results) => {
        if(err){
            return res.status(500).json({
                message : "Database error",
                success : false
            })
        }

        const schoolsWithDistance = results.map((school) => {
            const distance = calculateDistance(parseFloat(latitude), parseFloat(longitude), school.latitude, school.longitude);

            return {
                ...school,
                distance,
            }
        });

        schoolsWithDistance.sort((a, b) => 
        a.distance - b.distance);

        res.json(schoolsWithDistance);
    })
}

module.exports = {
    addSchool,
    listSchools
}