import User from "./User";
import Token from "./Token";
import Subscription from "./Subscription";
import Course from "./Course";
import Lesson from "./Lesson";
import UserCourse from "./UserCourse";
import Review from "./Review";
import Certificate from "./Certificate";
import Payment from "./Payment";
import ActivityLog from "./ActivityLog";
import Favorite from "./Favorite";
import SupportTicket from "./SupportTicket";
import Role from './Role'
import UserRole from './UserRole'

/* ----------------- TOKEN ----------------- */
User.hasOne(Token, { foreignKey: "userId", as: "token" });
Token.belongsTo(User, { foreignKey: "userId", as: "user" });

/* ----------------- SUBSCRIPTION ----------------- */
User.hasMany(Subscription, { foreignKey: "userId", as: "subscriptions" });
Subscription.belongsTo(User, { foreignKey: "userId", as: "user" });

/* ----------------- COURSE & LESSON ----------------- */
User.hasMany(Course, { foreignKey: "authorId", as: "courses" });
Course.belongsTo(User, { foreignKey: "authorId", as: "author" });

Course.hasMany(Lesson, { foreignKey: "courseId", as: "lessons" });
Lesson.belongsTo(Course, { foreignKey: "courseId", as: "course" });

/* ----------------- USER & COURSE (MANY-TO-MANY via UserCourse) ----------------- */
User.belongsToMany(Course, { 
  through: UserCourse, 
  foreignKey: "userId", 
  otherKey: "courseId", 
  as: "enrolledCourses" 
});
Course.belongsToMany(User, { 
  through: UserCourse, 
  foreignKey: "courseId", 
  otherKey: "userId", 
  as: "students" 
});

/* ----------------- FAVORITE ----------------- */
User.belongsToMany(Course, { 
  through: Favorite, 
  as: "favorites", 
  foreignKey: "userId", 
  otherKey: "courseId" 
});
Course.belongsToMany(User, { 
  through: Favorite, 
  as: "favoritedBy", 
  foreignKey: "courseId", 
  otherKey: "userId" 
});

/* ----------------- REVIEW ----------------- */
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Course.hasMany(Review, { foreignKey: "courseId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(Course, { foreignKey: "courseId", as: "course" });

/* ----------------- CERTIFICATE ----------------- */
User.hasMany(Certificate, { foreignKey: "userId", as: "certificates" });
Course.hasMany(Certificate, { foreignKey: "courseId", as: "certificates" });
Certificate.belongsTo(User, { foreignKey: "userId", as: "user" });
Certificate.belongsTo(Course, { foreignKey: "courseId", as: "course" });

/* ----------------- PAYMENT ----------------- */
User.hasMany(Payment, { foreignKey: "userId", as: "payments" });
Payment.belongsTo(User, { foreignKey: "userId", as: "user" });

/* ----------------- ACTIVITY LOG ----------------- */
User.hasMany(ActivityLog, { foreignKey: "userId", as: "activityLogs" });
ActivityLog.belongsTo(User, { foreignKey: "userId", as: "user" });

/* ----------------- SUPPORT TICKET ----------------- */
User.hasMany(SupportTicket, { foreignKey: "userId", as: "supportTickets" });
SupportTicket.belongsTo(User, { foreignKey: "userId", as: "user" });

/* ----------------- ROLES ----------------- */
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', otherKey: 'userId', as: 'users' });

export {
  User,
  Token,
  Subscription,
  Course,
  Lesson,
  UserCourse,
  Review,
  Certificate,
  Payment,
  ActivityLog,
  Favorite,
  SupportTicket,
  Role,
  UserRole
};
