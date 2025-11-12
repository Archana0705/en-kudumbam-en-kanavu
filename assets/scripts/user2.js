const loginStatus = localStorage.getItem('login_status');

if(loginStatus == null){
    window.location.href = "index.html";
}


function send_otp() {
  $("#otp").addClass("d-block").removeClass("d-none");
}
var user_details = JSON.parse(
  window.localStorage.getItem("user_details_kmut_verification")
);
$("#user_name").empty();
$("#mobile_number").empty();

$("#user_name").append(user_details.user_name);
$("#mobile_number").append(user_details.mobile_number);
$("#user_id").val(user_details.user_id);
$("#district_code").val(user_details.district_code);
$("#taluk_code").val(user_details.taluk_code);

$("#app_version").val($("#version_name").text());

var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var output =
  (("" + day).length < 2 ? "0" : "") +
  day +
  "/" +
  (("" + month).length < 2 ? "0" : "") +
  month +
  "/" +
  d.getFullYear();
document.getElementById("showdate").innerHTML = output;

$(document).ready(function () {
  setInterval("updateClock()", 1000);

  $(document).on({
    ajaxStart: function () {
      $("#preloader").show();
    },
    ajaxStop: function () {
      $("#preloader").hide();
    },
  });
});
function getdropdowns(selected_value, id) {
  //get occupation dropdown
  $.ajax({
    type: "POST",
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": "KMUT Verification App",
    },
    url: config.api_url + "/data_entry/getdropdownlist",
    data: {
      category: "Occupation",
      user_id: api_log_user_id,
    },
    dataType: "json",
    success: function (result) {
      var insp_officer_option;
      var data = result[0].data.dropdown_list;
      data.forEach(function (select) {
        if (select.category == "Inspecting officer comment") {
          insp_officer_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        }
      });
      $("#" + id).selectpicker("destroy");
      $("#" + id).append(insp_officer_option);
      $("#" + id).selectpicker("render");
      $("#" + id).val(selected_value);
      $("#" + id).selectpicker("refresh");
      $("#" + id).empty();
    },
  });
}

function getdropdownreasons(selectedIds) {
  $.ajax({
    type: "POST",
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": "KMUT Verification App",
    },
    url: config.api_url + "/data_entry/getdropdownlist",
    data: {
      category: "Occupation",
      user_id: api_log_user_id,
    },
    dataType: "json",
    success: function (result) {
      var data = result[0].data.dropdown_list;
      var container = $(".applicant_eligible_div .col-lg-12");

      // Clear existing content
      container.empty();

      // Add label
      container.append(`
              <label for="depName" class="form-label mb-0 w-100 p-1 font-14">
                  24.a. ????? ????? ??????:
              </label>
          `);

      var checkboxesHtml = "";

      // Generate checkboxes
      data.forEach(function (item) {
        if (item.category === "Complaint Reason") {
          checkboxesHtml += `
                      <div class="form-check">
                          <input class="form-check-input not_eligible_reason" 
                              type="checkbox" 
                              value="${item.value}" 
                              name="overall_rejection[]" 
                              id="not_eligible_${item.value}">
                          <label class="form-check-label" for="not_eligible_${item.value}">
                              ${item.display_text_tamil}
                          </label>
                      </div>
                  `;
        }
      });

      // Append all checkboxes at once (better performance)
      container.append(checkboxesHtml);

      // Mark selected checkboxes
      selectedIds.forEach(function (id) {
        var checkbox = document.getElementById("not_eligible_" + id);
        if (checkbox) {
          checkbox.checked = true; // Select the checkbox
        }
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching dropdown:", error);
    },
  });
}

window.onload = () => {
  //getLocation();
  var ufc_no = window.localStorage.getItem("ufc_no");
  ufc_search(ufc_no);
  getdropdowns();
  //check_last_data();
};
// Setup Geolocation API options
const gpsOptions = {
  enableHighAccuracy: true,
  //timeout: 15000,
  maximumAge: 0,
};
function getLocation() {
  if ("geolocation" in navigator) {
    //check geolocation available
    locationCapture();
  } else {
    console.log("Browser doesn't support geolocation!");
    alert("Geolocation is not supported in your device");
  }
}
// Location Capture Function
/*START: Trigger change function*/
function ufc_search(ufc_no) {
  $("#ration_number").val(ufc_no);
  $("#ration_number").attr("readonly", true);
  $("#search_ration_number").trigger("click");
}
/*END: Trigger change function*/
function locationCapture() {
  const watchID = navigator.geolocation.watchPosition(
    gpsSuccess,
    gpsError,
    gpsOptions
  );
}
// Geolocation: Error
function gpsError(err) {
  console.error(`Error: ${err.code}, ${err.message}`);
}
// Geolocation: Success
function gpsSuccess(pos) {
  // Get the lat, long, accuracy from Geolocation return (pos.coords)
  const { latitude, longitude, accuracy, altitude } = pos.coords;
  // console.log(latitude + '--' + longitude);
  const localStorageGeoLocation = {
    latitude: latitude,
    longitude: longitude,
    accuracy: accuracy,
    altitude: altitude,
  };
  window.localStorage.setItem(
    "geolocation",
    JSON.stringify(localStorageGeoLocation)
  );
  $("#user_lat").empty();
  $("#user_long").empty();
  $("#accuracy").empty();
  $("#user_lat").append(latitude.toFixed(6));
  $("#user_long").append(longitude.toFixed(6));
  $("#house_photo_latitude").val(latitude.toFixed(6));
  $("#house_photo_longitude").val(longitude.toFixed(6));
  var coordinates = [longitude.toFixed(6), latitude.toFixed(6)];
  // coordinates = ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857');
  $("#user_lat_gps").val(latitude);
  $("#user_long_gps").val(longitude);
  $("#user_gps_accuraccy").val(accuracy);
  $("#accuracy").text(accuracy.toFixed(2));
}
// HTML element where the time will be displayed
function updateClock() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = currentHours < 12 ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = currentHours > 12 ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = currentHours == 0 ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString =
    currentHours +
    ":" +
    currentMinutes +
    ":" +
    currentSeconds +
    " " +
    timeOfDay;

  $("#showTime").html(currentTimeString);
}

/**
 * Back to top button
 */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};
/**
 * Easy on scroll event listener
 */
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};
let backtotop = select(".back-to-top");
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add("active");
    } else {
      backtotop.classList.remove("active");
    }
  };
  window.addEventListener("load", toggleBacktotop);
  onscroll(document, toggleBacktotop);
}

$('input[type="checkbox"]').each(function () {
  if (!this.checked) {
    form_data.append(this.name, "off");
  }
});

$(document).ready(function () {
  $("#add_data_forms").validate({
    rules: {
      applicant_sys_gen_correct: {
        required: true,
      },
      applicant_given_info: {
        required: true,
      },
      applicant_eligible: {
        required: true,
      },
      verification_remarks: {
        required: true,
        minlength: 10,
      },
      applicant_status: {
        required: true,
      },
      overall_rejection: {
        required: function () {
          return $("input[name='applicant_eligible']:checked").val() === "no";
        },

      },
      applicant_status_yes: {
        required: true,
      }
    },
    messages: {
      applicant_sys_gen_correct: "இந்தக் களத்தை நிரப்ப வேண்டும்",
      applicant_given_info: "இந்தக் களத்தை நிரப்ப வேண்டும்",
      applicant_eligible: "இந்தக் களத்தை நிரப்ப வேண்டும்",
      verification_remarks: {
        required: "ஆய்வு அதிகாரியின் குறிப்பு தேவை",
        minlength: "குறைந்தது 10 எழுத்துகள் உள்ளிட வேண்டும்",
      },
      applicant_status: "உறுதிமொழியை தேர்ந்தெடுக்கவும்",
      overall_rejection: "விண்ணப்பதாரர் தகுதியற்றவராக இருந்தால் இந்தக் களத்தை நிரப்ப வேண்டும்",
      applicant_status_yes: "தயவுசெய்து ஒப்புதலை உள்ளிடவும்!! ",
    },
    errorPlacement: function (error, element) {
      if (element.is(":radio")) {
        error.appendTo(element.closest(".radio-select"));
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function (form) {
      if ($('#applicant_status_yes').is(':checked')) {
        submitFormData(form);
      } else {
        Swal.fire({
          icon: "error",
          title: "தயவுசெய்து ஒப்புதலை உள்ளிடவும்!! ",
          showConfirmButton: false,
          timer: 2000,
        })
      }

    },
  });

  function submitFormData(form) {
    let formData = new FormData(form); // Fix the FormData instantiation
    // let applicant_sys_gen_specify = $('#applicant_sys_gen_specify').val(); // Returns an array
    // applicant_sys_gen_specify = Array.isArray(applicant_sys_gen_specify) ? applicant_sys_gen_specify[0] : applicant_sys_gen_specify;
    // let applicant_given_info_select = $('#applicant_given_info_select').val(); // Returns an array
    // applicant_given_info_select = Array.isArray(applicant_given_info_select) ? applicant_given_info_select[0] : applicant_given_info_select;


    let applicant_sys_gen_specify = $('#applicant_sys_gen_specify').val() || [];
    // console.log("All selected values:", applicant_sys_gen_specify);
    let applicant_given_info_select = $('#applicant_given_info_select').val() || []; // Returns an array

    let mappedData = {
      p_data_correct_remark_id:JSON.stringify(applicant_sys_gen_specify), // Keep as array
      p_info_correct_remark_id: JSON.stringify(applicant_given_info_select), // Keep as array
      p_is_info_correct: formData.get("applicant_given_info"),
      p_is_data_correct: formData.get("applicant_sys_gen_correct"),
      p_is_eligible: formData.get("applicant_eligible"),
      p_not_eligible_remark_ids: JSON.stringify(formData.getAll("overall_rejection[]")), // Convert array to JSON string
      p_survey_officer_remarks: formData.get("verification_remarks"),
      applicant_status: formData.get("applicant_status"),

    };

    // Retrieve personal info ID from localStorage
    let id = localStorage.getItem("personalinfo_id");
    if (id) {
      mappedData.p_id = id;
      mappedData.p_beneficiary_id = id;
    }

    // Retrieve user details from localStorage
    let user_details_get = localStorage.getItem("user_details_kmut_verification");
    if (user_details_get) {
      try {
        let user_details = JSON.parse(user_details_get);
        mappedData.p_created_by = user_details.user_id;
      } catch (e) {
        console.error("Error parsing user details:", e);
      }
    }

    // Retrieve latitude and longitude from input fields
    let lat = $("#latitude").val();
    let lon = $("#longitude").val();
    mappedData.p_latitude = lat;
    mappedData.p_longtitude = lon;

    $.ajax({
      url: config.api_url + "/data_entry/verification",
      headers: {
        "X-APP-KEY": config.app_key,
        "X-APP-NAME": "KMUT Verification App",
      },
      type: "POST",
      data: mappedData,
      dataType: "json",
       
      success: function (response) {
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: " பயனாளியின் விவரங்கள் வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
            showConfirmButton: false,
            timer: 3000,
          }).then(function () {
            window.location.href = "./details.html"; // Redirect after success
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Please try again!! " + response.message,
            showConfirmButton: false,
            timer: 5000,
          }).then(function () {
            $("#add_insp_data").attr("disabled", false);
          });
          $("#preloader").hide();
        }
      },
        error: function (xhr, status, error) {
          console.error("Error:", error);

          let errorMessage = "எதிர்பாராத பிழை ஏற்பட்டது."; // Default message: "An unexpected error occurred." in Tamil

          try {
            const response = JSON.parse(xhr.responseText); // Attempt to parse the response

            if (response.errors && response.errors.length > 0) {
              // If there are specific errors, show them
              errorMessage = response.errors.join('<br>');
            } else if (response.message) {
              // If there is a general message
              errorMessage = response.message;
            }
          } catch (e) {
            console.warn("Failed to parse error response:", e);
            errorMessage += `<br>பிழை விவரம்: ${error}`; // Adding raw error details
          }

          // Show the error with SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'பிழை ஏற்பட்டது!', // "An error occurred!" in Tamil
            html: errorMessage,
            confirmButtonText: 'சரி' // "OK" in Tamil
        });
        }
    });
  }

});

function resetProgressBar() {
  $(".upload-progress").css("width", "0");
  $(".upload-progress-bar").hide();
}
