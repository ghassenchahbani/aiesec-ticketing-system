import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import api from "../../api";
import { AuthContext } from "../../AuthContext";

function TicketForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "New",
  });
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState("");

  const categories = [
    "Technical",
    "Financial",
    "Product",
  ];

  const statuses = ["New", "Under Review", "Resolved"];

  useEffect(() => {
    if (id) {
      fetchTicket();
    }
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tickets/${id}/`);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        category: response.data.category,
        status: response.data.status,
      });
      if (response.data.attachment) {
        setAttachmentPreview(response.data.attachment);
      }
    } catch (err) {
      setError("Failed to fetch ticket details");
      console.error("Error fetching ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAttachmentPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setAttachmentPreview("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!formData.category) {
      setError("Category is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("status", formData.status);

      if (attachment) {
        data.append("attachment", attachment);
      }

      if (id) {
        // Update existing ticket
        await api.put(`/tickets/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new ticket
        await api.post("/tickets/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigate("/tickets");
    } catch (err) {
      console.error("Error submitting ticket:", err);
      if (err.response?.data) {
        const errorMessages = Object.values(err.response.data).flat().join(", ");
        setError(errorMessages || "Failed to submit ticket");
      } else {
        setError("Failed to submit ticket");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/tickets");
  };

  if (loading && id) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox p={3}>
                  <MDTypography variant="h6">Loading...</MDTypography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  {id ? "Edit Ticket" : "Create New Ticket"}
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                {error && (
                  <MDBox mb={2}>
                    <MDTypography variant="caption" color="error" fontWeight="medium">
                      {error}
                    </MDTypography>
                  </MDBox>
                )}
                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <MDBox mb={2}>
                        <FormControl fullWidth>
                          <InputLabel sx={{ fontSize: "0.875rem" }}>Category</InputLabel>
                          <Select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            label="Category"
                            required
                            sx={{
                              height: "45px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(0, 0, 0, 0.23)",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(0, 0, 0, 0.87)",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#1976d2",
                              },
                            }}
                          >
                            {categories.map((cat) => (
                              <MenuItem key={cat} value={cat}>
                                {cat}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </MDBox>
                    </Grid>

                    {user?.isAdmin && id && (
                      <Grid item xs={12} md={6}>
                        <MDBox mb={2}>
                          <FormControl fullWidth>
                            <InputLabel sx={{ fontSize: "0.875rem" }}>Status</InputLabel>
                            <Select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              label="Status"
                              sx={{
                                height: "45px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "rgba(0, 0, 0, 0.23)",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "rgba(0, 0, 0, 0.87)",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1976d2",
                                },
                              }}
                            >
                              {statuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </MDBox>
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          fullWidth
                          multiline
                          rows={5}
                          required
                        />
                      </MDBox>
                    </Grid>

                    <Grid item xs={12}>
                      <MDBox mb={2}>
                        <MDBox mb={1}>
                          <MDTypography variant="caption" fontWeight="medium">
                            Attachment (Optional)
                          </MDTypography>
                        </MDBox>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          style={{ display: "block", marginBottom: "10px" }}
                        />
                        {attachmentPreview && (
                          <MDBox mt={2}>
                            {attachment && attachment.type.startsWith("image/") ? (
                              <img
                                src={attachmentPreview}
                                alt="Preview"
                                style={{ maxWidth: "300px", borderRadius: "8px" }}
                              />
                            ) : attachmentPreview.startsWith("http") ? (
                              attachmentPreview.toLowerCase().endsWith(".pdf") ? (
                                <MDButton
                                  variant="outlined"
                                  color="info"
                                  size="small"
                                  component="a"
                                  href={attachmentPreview}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Icon fontSize="small">picture_as_pdf</Icon>
                                  &nbsp;View Current PDF
                                </MDButton>
                              ) : (
                                <img
                                  src={attachmentPreview}
                                  alt="Current attachment"
                                  style={{ maxWidth: "300px", borderRadius: "8px" }}
                                />
                              )
                            ) : null}
                          </MDBox>
                        )}
                      </MDBox>
                    </Grid>

                    <Grid item xs={12}>
                      <MDBox display="flex" gap={2}>
                        <MDButton
                          variant="gradient"
                          color="info"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : id ? "Update Ticket" : "Create Ticket"}
                        </MDButton>
                        <MDButton variant="outlined" color="secondary" onClick={handleCancel}>
                          Cancel
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TicketForm;
