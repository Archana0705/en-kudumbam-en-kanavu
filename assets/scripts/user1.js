const loginStatus = localStorage.getItem('login_status');

if(loginStatus == null){
    window.location.href = "index.html";
}


var user_details = JSON.parse(window.localStorage.getItem('user_details_kmut_verification'));
$("#user_name").empty();
$("#mobile_number").empty();

$("#user_name").append(user_details.user_name);
$("#mobile_number").append(user_details.mobile_number);
$("#user_id").val(user_details.user_id);
$("#district_code").val(user_details.district_code);
$("#taluk_code").val(user_details.taluk_code);

$('#app_version').val($('#version_name').text())

var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var output = (('' + day).length < 2 ? '0' : '') + day + '/' +
  (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();
document.getElementById("showdate").innerHTML = output;


$(document).ready(function () {
  setInterval('updateClock()', 1000);

  $("#add_data_user1_form").validate({
    ignore: [],
    rules: {
      monthly_income: 'required',
      house_type: 'required',
      area_nanchai: 'required',
      area_punchai: 'required',
      applicant_bank_details: 'required',
      pie_credit_card_check: 'required',
      pie_has_income_loan: 'required',
      applicant_govt_job: 'required',
      applicant_ex_service: 'required',
      applicant_income_exceed: 'required',
      applicant_pt: 'required',
      applicant_gst: 'required',
      applicant_elected: 'required',
      applicant_pension: 'required',
      applicant_sys_gen_correct: 'required',
      applicant_given_info: 'required',
      applicant_eligible: 'required',

    },
    submitHandler: function (form) {
      post_form(form);
    }
  });
  $("#insp_fmember_name_0").rules("add", {
    required: true
  });
  $("#insp_fmember_age_0").rules("add", {
    required: true
  });
  $("#insp_fmember_occupation_0").rules("add", {
    required: true
  });
  $("#insp_fmember_income_m_0").rules("add", {
    required: true
  });
  $(document).on({
    ajaxStart: function () {
      $('#preloader').show();
    },
    ajaxStop: function () {
      $('#preloader').hide();
    }
  });
});
window.onload = () => {
  //getLocation();
  var ufc_no = window.localStorage.getItem("ufc_no");
  ufc_search(ufc_no);
 // getdropdown();
  //check_last_data();
};
// Setup Geolocation API options
const gpsOptions = {
  enableHighAccuracy: true,
  //timeout: 15000,
  maximumAge: 0
};
function getLocation() {
  if ("geolocation" in navigator) { //check geolocation available 
    locationCapture();
  } else {
    console.log("Browser doesn't support geolocation!");
    alert("Geolocation is not supported in your device");
  }
}
// Location Capture Function
/*START: Trigger change function*/
function ufc_search(ufc_no) {
  $('#ration_number').val(ufc_no);
  $('#ration_number').attr('readonly', true);
  $('#search_ration_number').trigger("click");

}
/*END: Trigger change function*/
function locationCapture() {
  const watchID = navigator.geolocation.watchPosition(gpsSuccess, gpsError, gpsOptions);
}
// Geolocation: Error
function gpsError(err) {
  console.error(`Error: ${err.code}, ${err.message}`);
}
// Geolocation: Success
function gpsSuccess(pos) {
  // Get the lat, long, accuracy from Geolocation return (pos.coords)
  const {
    latitude,
    longitude,
    accuracy,
    altitude
  } = pos.coords;
  // console.log(latitude + '--' + longitude);
  const localStorageGeoLocation = {
    latitude: latitude,
    longitude: longitude,
    accuracy: accuracy,
    altitude: altitude
  };
  window.localStorage.setItem('geolocation', JSON.stringify(localStorageGeoLocation));
  $("#user_lat").empty();
  $("#user_long").empty();
  $('#accuracy').empty();
  $("#user_lat").append(latitude.toFixed(6));
  $("#user_long").append(longitude.toFixed(6));
  $("#house_photo_latitude").val(latitude.toFixed(6));
  $("#house_photo_longitude").val(longitude.toFixed(6));
  var coordinates = [longitude.toFixed(6), latitude.toFixed(6)];
  // coordinates = ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857');
  $('#user_lat_gps').val(latitude)
  $('#user_long_gps').val(longitude)
  $('#user_gps_accuraccy').val(accuracy)
  $('#accuracy').text(accuracy.toFixed(2))
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
  var timeOfDay = (currentHours < 12) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = (currentHours == 0) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;


  $("#showTime").html(currentTimeString);
}



/**
* Back to top button
*/
const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}
/**
* Easy on scroll event listener 
*/
const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener)
}
let backtotop = select('.back-to-top')
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active')
    } else {
      backtotop.classList.remove('active')
    }
  }
  window.addEventListener('load', toggleBacktotop)
  onscroll(document, toggleBacktotop)
}



$('input:checked').parent().addClass('checked');


function post_form(form) {
  $('#add_insp_user1_data').attr('disabled', true);
  var geolocation = localStorage.getItem('geolocation');
  if (geolocation) {
    geolocation = JSON.parse(geolocation);
  }
  var personalinfo_id = localStorage.getItem('personalinfo_id');
  var user_details_get = localStorage.getItem('user_details_kmut_verification');
  if (user_details) {
    user_details = JSON.parse(user_details_get);
  }
  let form_data = {
    p_id: personalinfo_id,
    case: "form2_submit",
    // Beneficiary Survey Officer Details
    p_beneficiary_id: personalinfo_id,
    p_is_govt_employee: $("input[name='applicant_govt_job']:checked").val() === "yes" ? "true" : "false",
    p_govt_employee_id: $("#govt_fmember_name").val(),
    p_govt_employment_location: $("#govt_fmember_occu").val(),

    p_is_govt_pensioner : $("input[name='applicant_ex_service']:checked").val() === "yes" ? "true" : "false",
    p_govt_pensioner_id: $("#ex_service_fmember_name").val(),
    p_govt_pensioner_employment_location: $("#ex_service_fmember_occu").val(),

    p_is_income_tax_payers : $("input[name='applicant_income_exceed']:checked").val() === "yes" ? "true" : "false",
    p_tax_payers_id: $("#applicant_income_tax_pay").val(),
    p_tax_filer_name: $("#applicant_income_tax_file").val(),

    p_is_professional_tax_payers : $("input[name='applicant_pt']:checked").val() === "yes" ? "true" : "false",
    p_professional_tax_payers_id: $("#applicant_pt_fmember_name").val(),
    p_professional_tax_payers_occupation: $("#applicant_pt_fmember_occu").val(),

    p_is_gst_payers : $("input[name='applicant_gst']:checked").val() === "yes" ? "true" : "false",
    p_gst_payers_id: $("#applicant_gst_fmember_name").val(),
    p_gst_no: $("#applicant_gst_gstno").val(),

    p_is_elected_representatives : $("input[name='applicant_elected']:checked").val() === "yes" ? "true" : "false",
    p_elected_representatives_id: $("#applicant_elected_fmember_name").val(),
    p_elected_representatives_position_id: $("#applicant_elected_post").val(),

    p_is_social_welfare_pensioners : $("input[name='applicant_pension']:checked").val() === "yes" ? "true" : "false",
    p_social_welfare_pensioner_id: $("#applicant_pension_fmember_name").val(),
    p_social_welfare_pensioner_scheme_id: $("#applicant_pension_receiving").val(),

    p_created_by: user_details.user_id,
    p_latitude: geolocation.latitude,
    p_longtitude: geolocation.longitude

  };

  let p_is_govt_pensioner = $("input[name='applicant_ex_service']:checked").val() === "yes" ? "true" : "false";
let p_is_income_tax_payers = $("input[name='applicant_income_exceed']:checked").val() === "yes" ? "true" : "false";
let p_is_professional_tax_payers = $("input[name='applicant_pt']:checked").val() === "yes" ? "true" : "false";
let p_is_gst_payers = $("input[name='applicant_gst']:checked").val() === "yes" ? "true" : "false";
let p_is_elected_representatives = $("input[name='applicant_elected']:checked").val() === "yes" ? "true" : "false";
let p_is_social_welfare_pensioners = $("input[name='applicant_pension']:checked").val() === "yes" ? "true" : "false";

  var app_id = localStorage.getItem('app_id');

  
  $.ajax({
    type: 'POST',
    headers: { 'X-APP-KEY': config.app_key, 'X-APP-NAME': 'KMUT Verification App' },
    url: config.api_url + '/data_entry/add_verification_data',
    //data: $(form).serialize(),
    data: {
      'p_id': personalinfo_id,
      'case': "form2_submit",
      // Beneficiary Survey Officer Details
      'p_beneficiary_id': personalinfo_id,
      'p_is_govt_employee': $("input[name='applicant_govt_job']:checked").val() === "yes" ? "true" : "false",
      'p_govt_employee_id': $("#govt_fmember_name").val(),
      'p_govt_employment_location': $("#govt_fmember_occu option:selected").text() ,

      'p_is_govt_pensioner':  $("input[name='applicant_ex_service']:checked").val() === "yes" ? "true" : "false",
      'p_govt_pensioner_id': $("#ex_service_fmember_name").val(),
      'p_govt_pensioner_employment_location': $("#ex_service_fmember_occu option:selected").text(),

      'p_is_income_tax_payers': $("input[name='applicant_income_exceed']:checked").val() === "yes" ? "true" : "false",
      'p_tax_payers_id': $("#applicant_income_tax_pay").val(),
      'p_tax_filer_name': $("#applicant_income_tax_file option:selected").text(),

      'p_is_professional_tax_payers':  $("input[name='applicant_pt']:checked").val() === "yes" ? "true" : "false",
      'p_professional_tax_payers_id': $("#applicant_pt_fmember_name").val(),
      'p_professional_tax_payers_occupation': $("#applicant_pt_fmember_occu option:selected").text(),

      'p_is_gst_payers': $("input[name='applicant_gst']:checked").val() === "yes" ? "true" : "false",
      'p_gst_payers_id': $("#applicant_gst_fmember_name").val(),
      'p_gst_no': $("#applicant_gst_gstno").val(),

      'p_is_elected_representatives': $("input[name='applicant_elected']:checked").val() === "yes" ? "true" : "false",
      'p_elected_representatives_id': $("#applicant_elected_fmember_name").val() || null,
      'p_elected_representatives_position_id': $("#applicant_elected_post").val() || null,

      'p_is_social_welfare_pensioners': $("input[name='applicant_pension']:checked").val() === "yes" ? "true" : "false",

      'p_social_welfare_pensioner_id': $("#applicant_pension_fmember_name").val(),
      'p_social_welfare_pensioner_scheme_id': $("#applicant_pension_receiving").val(),

      'p_created_by': user_details.user_id,
      'p_latitude': geolocation.latitude,
      'p_longitude': geolocation.longitude

    },
    dataType: "json",
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          resetProgressBar();
          $('.upload-progress-bar').show();
          var percentComplete = evt.loaded / evt.total;
          percentComplete = parseInt(percentComplete * 100);
          $('.upload-progress').text(percentComplete + '%');
          $('.upload-progress').css('width', percentComplete + '%');
          if (percentComplete >= 100) {
            $('.upload-progress').text('Processing...Please Wait');
          }
        }
      }, false);
      return xhr;
    },
    success: function (response) {
      var res = response.success;
      //console.log(res);
      if (res == true) {
        Swal.fire({
          icon: "success",
          title: "பயனாளியின் விவரங்கள் வெற்றிகரமாக புதுப்பிக்கப்பட்டது உங்கள் விண்ணப்ப எண் " + app_id,
          showConfirmButton: false,
          timer: 3000
        }).then(function () {
          window.location.href = "./user2.html";
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: 'Please try again!!' + response.message,
          showConfirmButton: false,
          timer: 5000
        }).then(function () {
          location.reload();
        });
        $('#preloader').hide();
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
function resetProgressBar() {
  $('.upload-progress').css('width', '0');
  $('.upload-progress-bar').hide();
}

