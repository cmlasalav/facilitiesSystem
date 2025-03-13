// Definir los posibles estados del reporte
const ReportStatus = {
  PENDING: "pending",
  RECEIVED: "received",
  RESOLVED: "resolved",
};

// Definir la estructura del reporte
class Report {
  constructor(
    id,
    employeeId,
    employeeName,
    description,
    status,
    createdAt,
    imageUrl = null,
    scheduledDate = null,
    comments = null
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.imageUrl = imageUrl;
    this.scheduledDate = scheduledDate;
    this.comments = comments;
  }
}

// Definir la estructura del usuario
class User {
  constructor(id, name, role) {
    if (!["employee", "receptionist", "facilities"].includes(role)) {
      throw new Error("Invalid role");
    }
    this.id = id;
    this.name = name;
    this.role = role;
  }
}
