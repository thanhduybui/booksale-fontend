// // Function get provinces data
// const populateProvinces = async function () {
//   try {
//     // Make an API request to get the district data based on the selected province
//     const response = await fetch(`https://provinces.open-api.vn/api/p/`);
//     const data = await response.json();

//     // Get the district select element
//     const provinceSelect = document.getElementById("province");

//     // Clear existing options
//     provinceSelect.innerHTML = "";

//     // Add the default option
//     const defaultOption = document.createElement("option");
//     defaultOption.value = "0";
//     defaultOption.text = "Chọn tỉnh (thành phố)";
//     provinceSelect.appendChild(defaultOption);

//     // Populate the district options
//     data.forEach((province) => {
//       const option = document.createElement("option");
//       option.value = province.code;
//       option.text = province.name;
//       provinceSelect.appendChild(option);
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// populateProvinces();

// // Function to populate the district select element
// const populateDistricts = async (provinceCode) => {
//   try {
//     // Make an API request to get the district data based on the selected province
//     const response = await fetch(
//       `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
//     );
//     const data = await response.json();

//     const district = data.districts;

//     // Get the district select element
//     const districtSelect = document.getElementById("district");

//     //Clear existing options
//     districtSelect.innerHTML = "";

//     // Add the default option
//     const defaultOption = document.createElement("option");
//     defaultOption.value = "0";
//     defaultOption.text = "Chọn quận";
//     districtSelect.appendChild(defaultOption);

//     // Populate the district options
//     district.forEach((d) => {
//       const option = document.createElement("option");
//       option.value = d.code;
//       option.text = d.name;
//       districtSelect.appendChild(option);
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// // Event listener for province select element
// const provinceSelect = document.getElementById("province");
// provinceSelect.addEventListener("change", () => {
//   const selectedProvinceCode = provinceSelect.value;
//   populateDistricts(selectedProvinceCode);
// });

// // GET LIST WARDS BASE ON DISTRICT

// // Function to populate the district select element
// const populateWards = async (districtCode) => {
//   try {
//     // Make an API request to get the district data based on the selected province
//     const response = await fetch(
//       `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
//     );
//     const data = await response.json();

//     const wards = data.wards;

//     // Get the district select element
//     const wardSelect = document.getElementById("ward");

//     //Clear existing options
//     wardSelect.innerHTML = "";

//     // Add the default option
//     const defaultOption = document.createElement("option");
//     defaultOption.value = "0";
//     defaultOption.text = "Chọn phường (xã)";
//     wardSelect.appendChild(defaultOption);

//     // Populate the district options
//     wards.forEach((ward) => {
//       const option = document.createElement("option");
//       option.value = ward.code;
//       option.text = ward.name;
//       wardSelect.appendChild(option);
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// const districtSelect = document.getElementById("district");
// districtSelect.addEventListener("change", () => {
//   const selectedDistrictCode = districtSelect.value;
//   populateWards(selectedDistrictCode);
// });
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
