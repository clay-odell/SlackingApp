import { useState } from "react";

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
    { code: "CP", label: "Cookie Dough Cake Pop" },
  ];

  const displayOrder = ["BEC", "BB", "BBM", "CP", "CMT", "CW", "CC", "SEC", "W"];

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
      [code]: { ...prev[code], [field]: value },
    }));
  };

  const computeValues = (data, code) => {
    let amountNeeded = parseInt(data.amountNeeded || 0, 10);

    if (code === "CP") {
      amountNeeded = Math.ceil(amountNeeded / 3);
    }

    const numberOfTrays = parseInt(data.numberOfTrays || 0, 10);
    const drawers = parseInt(data.drawers || 0, 10);
    const slackingTrays = parseInt(data.slackingTrays || 0, 10);

    const alreadyThawed = drawers + slackingTrays;
    const amountToThaw = Math.max(amountNeeded - alreadyThawed, 0);
    const total = amountToThaw + numberOfTrays;

    return { amountNeeded, alreadyThawed, amountToThaw, total };
  };

  return (
    <div className="w-full p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Slacking Assistant</h1>

      {/* MOBILE VERSION */}
      <div className="md:hidden space-y-4">
        {food.map((item) => {
          const data = formData[item.code];
          const { amountNeeded, alreadyThawed, amountToThaw } = computeValues(
            data,
            item.code
          );

          return (
            <div
              key={item.code}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-lg">{item.label}</span>
                {item.code === "CP" && (
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded">
                    ÷3 rule
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Amount Needed</label>
                  <input
                    type="number"
                    className="w-full border rounded-md px-3 py-2 mt-1 text-base"
                    value={data.amountNeeded}
                    onChange={(e) =>
                      handleChange(item.code, "amountNeeded", e.target.value)
                    }
                  />
                  {item.code === "CP" && data.amountNeeded !== "" && (
                    <p className="text-xs text-purple-700 mt-1">
                      Counted as {amountNeeded} units
                    </p>
                  )}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-medium">Already Thawed:</span>
                  <span>{alreadyThawed}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-medium">Amount to Thaw:</span>
                  <span className="font-semibold text-blue-700">
                    {amountToThaw}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium">Number of Trays</label>
                  <input
                    type="number"
                    className="w-full border rounded-md px-3 py-2 mt-1 text-base"
                    value={data.numberOfTrays}
                    onChange={(e) =>
                      handleChange(item.code, "numberOfTrays", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Drawers</label>
                  <input
                    type="number"
                    className="w-full border rounded-md px-3 py-2 mt-1 text-base"
                    value={data.drawers}
                    onChange={(e) =>
                      handleChange(item.code, "drawers", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Slacking Trays</label>
                  <input
                    type="number"
                    className="w-full border rounded-md px-3 py-2 mt-1 text-base"
                    value={data.slackingTrays}
                    onChange={(e) =>
                      handleChange(item.code, "slackingTrays", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto mb-10 mt-6">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Food</th>
              <th className="border px-2 py-1">Amount Needed</th>
              <th className="border px-2 py-1">Already Thawed</th>
              <th className="border px-2 py-1">Amount to Thaw</th>
              <th className="border px-2 py-1">Number of Trays</th>
              <th className="border px-2 py-1">Drawers</th>
              <th className="border px-2 py-1">Slacking Trays</th>
            </tr>
          </thead>

          <tbody>
            {food.map((item) => {
              const data = formData[item.code];
              const { amountNeeded, alreadyThawed, amountToThaw } = computeValues(
                data,
                item.code
              );

              return (
                <tr key={item.code} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-2 py-1">
                    <div className="flex items-center gap-2">
                      {item.label}
                      {item.code === "CP" && (
                        <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded">
                          ÷3 rule
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      className="w-full border rounded px-2 py-1"
                      value={data.amountNeeded}
                      onChange={(e) =>
                        handleChange(item.code, "amountNeeded", e.target.value)
                      }
                    />
                    {item.code === "CP" && data.amountNeeded !== "" && (
                      <p className="text-xs text-purple-700 mt-1">
                        Counted as {amountNeeded} units
                      </p>
                    )}
                  </td>

                  <td className="border px-2 py-1 text-center">
                    {alreadyThawed}
                  </td>

                  <td className="border px-2 py-1 text-center font-semibold text-blue-700">
                    {amountToThaw}
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      className="w-full border rounded px-2 py-1"
                      value={data.numberOfTrays}
                      onChange={(e) =>
                        handleChange(item.code, "numberOfTrays", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      className="w-full border rounded px-2 py-1"
                      value={data.drawers}
                      onChange={(e) =>
                        handleChange(item.code, "drawers", e.target.value)
                      }
                    />
                  </td>

                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      className="w-full border rounded px-2 py-1"
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
        </table>
      </div>

      {/* SUMMARY TABLE */}
      <h3 className="text-center text-xl font-bold mb-3">Printing Summary</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Food</th>
              <th className="border px-2 py-1"># of Labels to Print</th>
            </tr>
          </thead>

          <tbody>
            {displayOrder.map((code) => {
              const item = food.find((f) => f.code === code);
              const data = formData[code];
              const { total } = computeValues(data, code);

              return (
                <tr key={code} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-2 py-1">{item?.label}</td>
                  <td className="border px-2 py-1 text-center font-semibold">
                    {total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
