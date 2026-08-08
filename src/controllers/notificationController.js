import Notification from "../models/Notification.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      receiver: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    notification.isRead = true;

    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      notification,
    });
  } catch (error) {
    console.error("Mark Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        receiver: req.user._id,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
    });
  } catch (error) {
    console.error("Mark All Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
