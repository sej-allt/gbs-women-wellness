import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

export const getGoogleFitData = async (req, res) => {
  try {
    console.log("hii");
    const { token } = req.body;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token is required" });
    }

    // Set up OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const fitness = google.fitness({
      version: "v1",
      auth: oauth2Client, // ✅ Corrected authentication
    });

    const endTimeMillis = Date.now();
    const startTimeMillis = new Date();
    startTimeMillis.setHours(0, 0, 0, 0);

    const response = await fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId:
              "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: 1438705622000,
        endTimeMillis: 1439310422000,
      },
    });
    console.log("Raw Response:", JSON.stringify(response.data, null, 2));

    const steps = response.data.bucket.reduce((total, bucket) => {
      return total + (bucket.dataset[0]?.point[0]?.value[0]?.intVal || 0);
    }, 0);

    console.log(steps);
    res.status(200).json({ success: true, steps });
  } catch (error) {
    console.error("Google Fit Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Google Fit data",
      error: error.message,
    });
  }
};
