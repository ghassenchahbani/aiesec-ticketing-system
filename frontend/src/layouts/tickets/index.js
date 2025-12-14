import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { AuthContext } from "../../AuthContext";
import api from "../../api";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAdmin = user?.isAdmin || false;

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [tickets, searchQuery, selectedCategory, selectedStatus]);

  const fetchTickets = async () => {
    try {
      const response = await api.get("/tickets/");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const filterTickets = () => {
    let filtered = [...tickets];

    if (searchQuery) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.created_by?.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((ticket) => ticket.category === selectedCategory);
    }

    if (selectedStatus) {
      filtered = filtered.filter((ticket) => ticket.status === selectedStatus);
    }

    setFilteredTickets(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await api.delete(`/tickets/${id}/`);
        fetchTickets();
      } catch (error) {
        console.error("Error deleting ticket:", error);
        alert("Failed to delete ticket");
      }
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
        return "secondary";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const categories = [
    "Technical",
    "Financial",
    "Product",
  ];

  const statuses = ["New", "Under Review", "Resolved"];

  const getTableData = () => {
    const columns = [
      { Header: "ID", accessor: "id", width: "5%", align: "center" },
      { Header: "Title", accessor: "title", width: "25%", align: "left" },
      { Header: "Category", accessor: "category", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Created By", accessor: "createdBy", align: "left" },
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ];

    const rows = filteredTickets.map((ticket) => ({
      id: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          #{ticket.id}
        </MDTypography>
      ),
      title: (
        <MDBox
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
        >
          <MDTypography variant="button" fontWeight="medium">
            {ticket.title}
          </MDTypography>
          <MDTypography variant="caption" color="text" display="block">
            {ticket.description.substring(0, 50)}
            {ticket.description.length > 50 ? "..." : ""}
          </MDTypography>
        </MDBox>
      ),
      category: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {ticket.category}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={ticket.status}
            color={getStatusColor(ticket.status)}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      createdBy: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {ticket.created_by?.username || "Unknown"}
        </MDTypography>
      ),
      date: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {formatDate(ticket.created_at)}
        </MDTypography>
      ),
      actions: (
        <MDBox display="flex" justifyContent="center" gap={1}>
          <MDButton
            variant="text"
            color="info"
            size="small"
            iconOnly
            onClick={() => navigate(`/tickets/${ticket.id}`)}
          >
            <Icon>visibility</Icon>
          </MDButton>
          {(isAdmin || ticket.created_by?.id === user?.id) && (
            <>
              <MDButton
                variant="text"
                color="dark"
                size="small"
                iconOnly
                onClick={() => navigate(`/tickets/edit/${ticket.id}`)}
              >
                <Icon>edit</Icon>
              </MDButton>
              {isAdmin && (
                <MDButton
                  variant="text"
                  color="error"
                  size="small"
                  iconOnly
                  onClick={() => handleDelete(ticket.id)}
                >
                  <Icon>delete</Icon>
                </MDButton>
              )}
            </>
          )}
        </MDBox>
      ),
    }));

    return { columns, rows };
  };

  const { columns, rows } = getTableData();

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
                  Tickets
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  onClick={() => navigate("/tickets/create")}
                >
                  <Icon>add</Icon>&nbsp;Create New Ticket
                </MDButton>
              </MDBox>

              <MDBox p={3}>
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      type="text"
                      label="Search tickets..."
                      fullWidth
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ fontSize: "0.875rem" }}>Category</InputLabel>
                      <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        label="Category"
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
                        <MenuItem value="">All Categories</MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ fontSize: "0.875rem" }}>Status</InputLabel>
                      <Select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
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
                        <MenuItem value="">All Statuses</MenuItem>
                        {statuses.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <DataTable
                  table={{ columns, rows }}
                  isSorted
                  entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
                  showTotalEntries
                  noEndBorder
                  canSearch={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tickets;
