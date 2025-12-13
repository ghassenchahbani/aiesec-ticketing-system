import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { AuthContext } from "../../AuthContext";
import api from "../../api";
import Icon from "@mui/material/Icon";
import TimelineItem from "examples/Timeline/TimelineItem";
import Divider from "@mui/material/Divider";

function TicketDetail() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isAdmin = user?.isAdmin || false;

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await api.get(`/tickets/${id}/`);
      setTicket(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!isAdmin) {
      alert("Only admin users can change ticket status");
      return;
    }

    try {
      const response = await api.patch(`/tickets/${id}/status/`, { status: newStatus });
      setTicket(response.data);
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "info";
      case "Under Review":
        return "warning";
      case "Resolved":
        return "success";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3} display="flex" justifyContent="center">
          <MDTypography variant="h6">Loading...</MDTypography>
        </MDBox>
      </DashboardLayout>
    );
  }

  if (!ticket) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3} textAlign="center">
          <MDTypography variant="h6">Ticket not found</MDTypography>
          <MDButton color="info" onClick={() => navigate("/tickets")} sx={{ mt: 2 }}>
            Back to Tickets
          </MDButton>
        </MDBox>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          {/* Action Buttons */}
          <Grid item xs={12}>
            <MDBox display="flex" gap={2}>
              <MDButton
                variant="outlined"
                color="info"
                onClick={() => navigate("/tickets")}
              >
                <Icon>arrow_back</Icon>&nbsp;Back
              </MDButton>
              {isAdmin && (
                <MDButton
                  variant="outlined"
                  color="warning"
                  onClick={() => navigate(`/tickets/edit/${id}`)}
                >
                  <Icon>edit</Icon>&nbsp;Edit
                </MDButton>
              )}
            </MDBox>
          </Grid>

          {/* Main Ticket Information */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: "100%" }}>
              <MDBox p={3}>
                {/* Title and Status */}
                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                  <MDBox>
                    <MDTypography variant="h4" fontWeight="medium" mb={1}>
                      {ticket.title}
                    </MDTypography>
                    <MDTypography variant="button" color="text" fontWeight="regular">
                      Ticket #{ticket.id}
                    </MDTypography>
                  </MDBox>
                  <MDBadge
                    badgeContent={ticket.status}
                    color={getStatusColor(ticket.status)}
                    variant="gradient"
                    size="lg"
                    container
                  />
                </MDBox>

                <Divider />

                {/* Description */}
                <MDBox mt={3} mb={3}>
                  <MDTypography variant="h6" mb={2}>
                    Description
                  </MDTypography>
                  <MDTypography variant="body2" color="text" sx={{ lineHeight: 1.8 }}>
                    {ticket.description}
                  </MDTypography>
                </MDBox>

                {/* Attachment */}
                {ticket.attachment && (
                  <>
                    <Divider />
                    <MDBox mt={3}>
                      <MDTypography variant="h6" mb={2}>
                        Attachment
                      </MDTypography>
                      {ticket.attachment.endsWith(".pdf") ? (
                        <MDButton
                          variant="outlined"
                          color="info"
                          component="a"
                          href={ticket.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon>picture_as_pdf</Icon>&nbsp;View PDF
                        </MDButton>
                      ) : (
                        <MDBox
                          component="img"
                          src={ticket.attachment}
                          alt="Attachment"
                          sx={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "300px",
                            objectFit: "contain",
                            borderRadius: "8px",
                            boxShadow: 2,
                          }}
                        />
                      )}
                    </MDBox>
                  </>
                )}
              </MDBox>
            </Card>
          </Grid>

          {/* Sidebar - Ticket Details */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Ticket Info Card */}
              <Grid item xs={12}>
                <Card>
                  <MDBox p={3}>
                    <MDTypography variant="h6" mb={3}>
                      Ticket Information
                    </MDTypography>
                    
                    <MDBox mb={2}>
                      <MDTypography variant="caption" color="text" fontWeight="bold">
                        Category
                      </MDTypography>
                      <MDBox mt={0.5}>
                        <MDBadge badgeContent={ticket.category} color="dark" variant="gradient" size="sm" />
                      </MDBox>
                    </MDBox>

                    <MDBox mb={2}>
                      <MDTypography variant="caption" color="text" fontWeight="bold">
                        Created By
                      </MDTypography>
                      <MDBox display="flex" alignItems="center" mt={0.5}>
                        <Icon fontSize="small">person</Icon>
                        <MDTypography variant="body2" ml={1}>
                          {ticket.created_by?.username}
                        </MDTypography>
                      </MDBox>
                    </MDBox>

                    <MDBox>
                      <MDTypography variant="caption" color="text" fontWeight="bold">
                        Created At
                      </MDTypography>
                      <MDBox display="flex" alignItems="center" mt={0.5}>
                        <Icon fontSize="small">schedule</Icon>
                        <MDTypography variant="body2" ml={1}>
                          {new Date(ticket.created_at).toLocaleString()}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>

              {/* Admin Status Update Card */}
              {isAdmin && (
                <Grid item xs={12}>
                  <Card>
                    <MDBox p={3}>
                      <MDTypography variant="h6" mb={2}>
                        Update Status
                      </MDTypography>
                      <MDBox display="flex" flexDirection="column" gap={1.5}>
                        <MDButton
                          variant={ticket.status === "New" ? "gradient" : "outlined"}
                          color="info"
                          onClick={() => handleStatusChange("New")}
                          disabled={ticket.status === "New"}
                          fullWidth
                        >
                          <Icon>fiber_new</Icon>&nbsp;New
                        </MDButton>
                        <MDButton
                          variant={ticket.status === "Under Review" ? "gradient" : "outlined"}
                          color="warning"
                          onClick={() => handleStatusChange("Under Review")}
                          disabled={ticket.status === "Under Review"}
                          fullWidth
                        >
                          <Icon>pending</Icon>&nbsp;Under Review
                        </MDButton>
                        <MDButton
                          variant={ticket.status === "Resolved" ? "gradient" : "outlined"}
                          color="success"
                          onClick={() => handleStatusChange("Resolved")}
                          disabled={ticket.status === "Resolved"}
                          fullWidth
                        >
                          <Icon>check_circle</Icon>&nbsp;Resolved
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Status History Timeline */}
          {ticket.status_history && ticket.status_history.length > 0 && (
            <Grid item xs={12}>
              <Card>
                <MDBox p={3}>
                  <MDTypography variant="h6" mb={2}>
                    Status History
                  </MDTypography>
                  <MDBox pt={2} pb={1}>
                    {ticket.status_history.map((item, index) => (
                      <TimelineItem
                        key={index}
                        color={getStatusColor(item.status)}
                        icon={item.status === "New" ? "fiber_new" : item.status === "Under Review" ? "pending" : "check_circle"}
                        title={item.status}
                        dateTime={new Date(item.changed_at).toLocaleString()}
                        description={item.changed_by ? `Changed by ${item.changed_by.username}` : ""}
                        lastItem={index === ticket.status_history.length - 1}
                      />
                    ))}
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TicketDetail;
