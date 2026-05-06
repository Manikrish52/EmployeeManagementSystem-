import { Grid, Typography } from "@mui/material"

const EmployeeCard = ({ totalEmployees, activeCount, inactiveCount, cardHeaders }) => {
    return(
        
              <Grid container sx={{ marginTop: "10px", }}  >
        
        
                {cardHeaders.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} sx={{ padding: "5px" }}>
                    <Grid sx={{ height: "150px", background: item.background, borderRadius: "10px", padding: "20px" }} >
                      <Grid sx={{
                        height: "100%", overflow: "auto",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "rgba(255,255,255,0.2)",
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "rgba(0,0,0,0.4)",
                          borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "rgba(0,0,0,0.6)",
                        },
        
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(0,0,0,0.4) transparent",
                      }} >
                        <Typography sx={{ color: "#fff", fontSize: "20px", fontWeight: "bold" }}>{item?.header}</Typography>
                        {item.header === "Total Employees" ? (
                          <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>{totalEmployees}</Typography>
                        ) : item.header === "Active" ? (
                          <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>{activeCount}</Typography>
                        ) : item.header === "Inactive" ? (
                          <Typography sx={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>{inactiveCount}</Typography>
                        ) : null}
                        
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
        
        
              </Grid>
    )
}

export default EmployeeCard