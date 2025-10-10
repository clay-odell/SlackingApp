import { useState } from "react";
import { Form, Table, Card } from "react-bootstrap";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const food = [
    { code: "BEC", label: "Bacon Slider" },
    { code: "SEC", label: "Sausage Slider" },
    { code: "CW", label: "Chorizo Wraps" },
    { code: "W", label: "Waffle" },
    { code: "CC", label: "Coffee Cake" },
    { code: "BB", label: "Banana Bread" },
    { code: "CMT", label: "Choc Chip Muffin" },
    { code: "BBM", label: "Blueberry Muffin" },
  ];

  // custom display order
  const displayOrder = [
    "BEC", // Bacon Slider
    "BB", // Banana Bread
    "BBM", // Blueberry Muffin
    "CMT", // Choc Chip Muffin
    "CW", // Chorizo Wraps
    "CC", // Coffee Cake
    "SEC", // Sausage Slider
    "W", // Waffle
  ];

  const [formData, setFormData] = useState(
    food.reduce((acc, item) => {
      acc[item.code] = {
        amountNeeded: "",
        numberOfTrays: "",
        drawers: "",
        slackingTrays: "",
      };
      return acc;
    }, {})
  );

  const handleChange = (code, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        [field]: value,
      },
    }));
  };

  return (
    <>
      <div className="header">
        <h1>Slacking Assistant</h1>
      </div>

      {/* Main Input Table */}
      <Card className="main p-3 mb-4">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Food</th>
              <th>Amount Needed</th>
              <th>Already Thawed</th>
              <th>Amount to Thaw</th>
              <th>Number of Trays</th>
              <th>Drawers</th>
              <th>Slacking Trays</th>
            </tr>
          </thead>
          <tbody>
            {food.map((item) => {
              const data = formData[item.code];
              const alreadyThawed =
                parseInt(data.drawers || 0, 10) +
                parseInt(data.slackingTrays || 0, 10);
              const amountToThaw =
                parseInt(data.amountNeeded || 0, 10) - alreadyThawed;

              return (
                <tr key={item.code}>
                  <td>{item.label}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={data.amountNeeded}
                      onChange={(e) =>
                        handleChange(item.code, "amountNeeded", e.target.value)
                      }
                    />
                  </td>
                  <td>{alreadyThawed}</td>
                  <td>{amountToThaw >= 0 ? amountToThaw : 0}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={data.numberOfTrays}
                      onChange={(e) =>
                        handleChange(item.code, "numberOfTrays", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={data.drawers}
                      onChange={(e) =>
                        handleChange(item.code, "drawers", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={data.slackingTrays}
                      onChange={(e) =>
                        handleChange(item.code, "slackingTrays", e.target.value)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
      {/* Summary Table */}
      <Card className="summary p-3">
        <h3>Summary</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Food</th>
              <th># of Labels to Print</th>
            </tr>
          </thead>
          <tbody>
            {displayOrder.map((code) => {
              const item = food.find((f) => f.code === code);
              const data = formData[code];

              const alreadyThawed =
                parseInt(data.drawers || 0, 10) +
                parseInt(data.slackingTrays || 0, 10);

              const amountToThaw =
                parseInt(data.amountNeeded || 0, 10) - alreadyThawed;

              const total =
                (amountToThaw >= 0 ? amountToThaw : 0) +
                parseInt(data.numberOfTrays || 0, 10);

              return (
                <tr key={code}>
                  <td>{item?.label}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default Home;
