import Notification from "../models/Notification.js";

const createNotification = async ({
  receiver,
  title,
  message,
  type = "system",
}) => {
  try {
    return await Notification.create({
      receiver,
      title,
      message,
      type,
    });
  } catch (error) {
    console.error("Create Notification Error:", error);
    return null;
  }
};

export default createNotification;
