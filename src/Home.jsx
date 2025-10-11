import { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
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

  const displayOrder = ["BEC", "BB", "BBM", "CMT", "CW", "CC", "SEC", "W"];

  // initialize state
  const [formData, setFormData] = useState(
    food.reduce((acc, item) => {
      acc[item.code] = {
        amountNeeded: 0,
        numberOfTrays: 0,
        drawers: 0,
        slackingTrays: 0,
      };
      return acc;
    }, {})
  );

  // normalize inputs to numbers
  const handleChange = (code, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [code]: { ...prev[code], [field]: Number(value) || 0 },
    }));
  };

  // helper to compute derived values
  const computeValues = (data) => {
    const { amountNeeded = 0, numberOfTrays = 0, drawers = 0, slackingTrays = 0 } = data;
    const alreadyThawed = drawers + slackingTrays;
    const amountToThaw = Math.max(amountNeeded - alreadyThawed, 0);
    const total = amountToThaw + numberOfTrays;
    return { alreadyThawed, amountToThaw, total };
  };

  return (
    <div className="container-fluid p-0">
      <div className="header">
        <h1>Slacking Assistant</h1>
        <p>
          Instructions: <br />
          <strong>ALL DATA IS LOST ON PAGE REFRESH!!!!!</strong>
        </p>
        <ol>
          <li>Enter the correct amount for each food item into amount needed column.</li>
          <li>Count thawed food using the columns for drawers and slacking trays.</li>
          <li>Put the number of trays you plan on using in the number of trays column.</li>
          <li>Don’t forget to write on the Slacking Form on the freezer.</li>
        </ol>
      </div>

      {/* Main Input Table */}
      <div className="table-responsive">
        <Table striped bordered hover size="sm" className="w-100">
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
              const { alreadyThawed, amountToThaw } = computeValues(data);

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
                  <td className="amount-to-thaw">{amountToThaw}</td>
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
      </div>

      {/* Summary Table */}
      <h3 className="text-center">Printing Summary</h3>
      <div className="table-responsive summary-table">
        <Table striped bordered hover size="sm" className="w-100">
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
              const { total } = computeValues(data);

              return (
                <tr key={code}>
                  <td>{item?.label}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
