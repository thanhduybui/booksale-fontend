// Function to populate select options
const populateOptions = async (apiUrl, selectElementId, defaultText) => {
  try {
    // Make an API request
    const response = await fetch(apiUrl);
    const data = await response.json();

    let filterData = "";
    switch (selectElementId) {
      case "province":
        filterData = data;
        break;
      case "district":
        filterData = data.districts;
        break;
      case "ward":
        filterData = data.wards;
        break;
    }

    // Get the select element
    const selectElement = document.getElementById(selectElementId);

    // Clear existing options
    selectElement.innerHTML = "";

    // Add the default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "0";
    defaultOption.text = defaultText;
    selectElement.appendChild(defaultOption);

    // Populate the options
    filterData.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.code;
      option.text = item.name;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

// Populate provinces
populateOptions(
  "https://provinces.open-api.vn/api/p/",
  "province",
  "Chọn tỉnh (thành phố)"
);

// Event listener for province select element
const provinceSelect = document.getElementById("province");
provinceSelect.addEventListener("change", () => {
  const selectedProvinceCode = provinceSelect.value;
  const apiUrl = `https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`;
  populateOptions(apiUrl, "district", "Chọn quận (huyện)");
});

// Event listener for district select element
const districtSelect = document.getElementById("district");
districtSelect.addEventListener("change", () => {
  const selectedDistrictCode = districtSelect.value;
  const apiUrl = `https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`;
  populateOptions(apiUrl, "ward", "Chọn phường (xã)");
});
