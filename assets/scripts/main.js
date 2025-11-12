var photo_capture_flag = false;
var occupation_option = "";
var family_info_option = "";
var checked_radio_yes_option = new Array();
var family_total_members;
var family_member_name = [];
//whole number regex
$("body").on("input", ".number", function () {
  var first_char = this.value.charAt(0);
  if (first_char == 0) {
    this.value = this.value.replace(/[^1-9]/gi, "");
  }
  this.value = this.value.replace(/[^0-9]/gi, "");
});
//whole number regex
$("body").on("input", ".insp_indiv_income", function () {
  var first_char = this.value.charAt(0);
  if (first_char == 0) {
    //this.value = this.value.replace(/[^1-9]/gi, '')
  }
  this.value = this.value.replace(/[^0-9]/gi, "");
});
//whole number regex
$("body").on("input", ".bank_number", function () {
  var first_char = this.value.charAt(0);
  if (first_char == 0) {
    //this.value = this.value.replace(/[^1-9]/gi, '')
  }
  this.value = this.value.replace(/[^0-9]/gi, "");
});
//whole number regex
$("body").on("input", ".ifsc_number", function () {
  this.value = this.value.replace(/[^0-9]/gi, "");
});
//decimal number validation
$("body").on("change", ".decimal", function () {
  //valdation for 6 digit and 2 decimal
  this.value = isNaN(parseFloat($(this).val()))
    ? ""
    : parseFloat($(this).val());
  var reg = /^\d{1,6}\.\d{1,2}$|^\d{1,6}$/g;
  if ($(this).val().match(reg) == null) {
    $(this).val("");
    $(this).focus();
    $(this).trigger("input");
  } else {
  }
});
$("body").on("change", ".area_decimal", function () {
  //valdation for 6 digit and 2 decimal
  this.value = isNaN(parseFloat($(this).val()))
    ? ""
    : parseFloat($(this).val());
  var reg = /^\d{1,6}\.\d{1,2}$|^\d{1,6}$/g;
  if ($(this).val().match(reg) == null) {
    $(this).val("");
    $(this).focus();
  } else {
  }
});
$("body").on("change", ".fmember_age", function () {
  //valdation for 6 digit and 2 decimal
  if ($(this).val() > 120) {
    alert("Age must be less than 120");
    $(this).val("");
    $(this).focus();
  }
});
$("#verification_remarks").bind("keydown", function (event) {
  switch (event.keyCode) {
    case 8: // Backspace
    case 9: // Tab
    case 13: // Enter
    case 37: // Left
    case 38: // Up
    case 39: // Right
    case 40: // Down
      break;
    default:
      var regex = new RegExp("^[a-zA-Z0-9.,/ $@()]+$");
      var key = event.key;
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
      break;
  }
});
//highlight textbox based on income pa and conver to currency format
$("#insp_family_monthly_income").on("input", function () {
  var income = $(this).val();
  if (income.length >= 5) {
    var income_pa = parseFloat(income * 12);
    income_pa = income_pa.toFixed(2);
    if (income_pa > 250000) {
      $(this).addClass("textbox_red_color");

      //$('#applicant_income_pa_more').attr('checked', 'checked');
      $("#applicant_income_pa_more").prop("checked", true);
      $("#applicant_income_pa_more").parent().addClass("prevent_click");
    } else {
      $(this).removeClass("textbox_red_color");

      //$('#applicant_income_pa_more').removeAttr('checked');
      $("#applicant_income_pa_more").prop("checked", false);
      $("#applicant_income_pa_more").parent().removeClass("prevent_click");
    }
    $("#income_pa_convert").removeClass("d-none");
    $("#income_pa_convert").text(
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(income_pa) + "/-p.a"
    );
  } else {
    $(this).removeClass("textbox_red_color");
    $("#income_pa_convert").addClass("d-none");

    //$('#applicant_income_pa_more').removeAttr('checked');
    $("#applicant_income_pa_more").prop("checked", false);
    $("#applicant_income_pa_more").parent().removeClass("prevent_click");
  }
  $("#applicant_income_pa_more").trigger("change");
});
//convert to currency format
$("body").on("input", ".insp_indiv_income", function () {
  var income = $(this).val();
  if (income.length >= 5) {
    var income_pa = parseFloat(income * 12);
    income_pa = income_pa.toFixed(2);
    //console.log($(this).parent().find('.ruppee_converter'));
    $(this).parent().find(".ruppee_converter").removeClass("d-none");
    $(this)
      .parent()
      .find(".ruppee_converter")
      .text(
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(income_pa) + "/-p.a"
      );
  } else {
    $(this).parent().find(".ruppee_converter").addClass("d-none");
  }
});
$("body").on("input", ".insp_indiv_income", function () {
  var sum = 0;
  $(".insp_indiv_income").each(function () {
    var num1 = parseInt($(this).val());
    sum += !isNaN(num1) ? num1 : 0;
  });
  if (sum == 0) {
    $("#insp_family_monthly_income").val("");
    $("#insp_family_monthly_income").trigger("input");
    $("#insp_family_yearly_income").val("");
    $("#insp_family_yearly_income").trigger("input");
  } else {
    $("#insp_family_monthly_income").val(sum);
    $("#insp_family_monthly_income").trigger("input");
    $("#insp_family_yearly_income").val(sum * 12);
    $("#insp_family_yearly_income").trigger("input");
  }
});
//photo icon click trigger input type file
$("#click_photos").on("click", function () {
  $("#photos").trigger("click");
});

$("body").on("input", ".distribution_no", function () {
  this.value = this.value.replace(/[^0-9]/gi, "");
  if ($(this).val().length == 3) {
    $(this).parent().next().find("input").focus();
  }
});
$("body").on("input", ".service_no", function () {
  this.value = this.value.replace(/[^0-9]/gi, "");
});

$("body").on("change", "#applicant_bank_account_ifsc1", function () {
  var ifsc_number = $(this).val();
  var first_char = ifsc_number.charAt(4);
  if (first_char == 0) {
    if (ifsc_number.length < 11) {
      alert("Enter valid IFSC Number");
      $(this).val("");
      $(this).focus("");
    } else {
      var first_four = ifsc_number.substring(0, 4);
      //console.log(first_four)
      var charArray = first_four.split("");
      $.each(charArray, function (index, character) {
        if (isNumeric(character)) {
          //console.log("The value is numeric.");
          alert("Enter valid IFSC Number");
          $("#applicant_bank_account_ifsc1").val("");
          $("#applicant_bank_account_ifsc1").focus("");
          return false;
        } else {
          //console.log("The value is not numeric.");
        }
      });
    }
  } else {
    alert("IFSC Code Fifth Number should be zero");
    $(this).val("");
    $(this).focus("");
  }
});
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

var inputBox = document.querySelector(".decimal");

var invalidChars = ["-", "+", "e"];

if (inputBox) {
  // This prevents the error
  inputBox.addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
}

var inputBox1 = document.querySelector(".area_decimal");

var invalidChars1 = ["-", "+", "e"];

if (inputBox1) {
  inputBox1.addEventListener("keydown", function (e) {
    if (invalidChars1.includes(e.key)) {
      e.preventDefault();
    }
  });
}
$("body").on("click", "#insp_add_fam_mem", function () {
  var len = $(".insp_indiv_income").length;
  if (len == family_total_members) {
    //alert("Maximum " + family_total_members + " persons allowed")
    Swal.fire("Maximum " + family_total_members + " persons allowed");
    return;
  }
  var sno = len + 1;
  var via_tr = `<div><a href='javascript:void(0)' class='del_fmember_div' style='color:red;text-decoration:none;'><i class='bi bi-dash-circle-fill'></i> Delete </a><div class="col-lg-12 mb-2 mx-2">
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">குடும்ப உறுப்பினர் பெயர்</label>
                  <select class="form-select append_family_member_name insp_fname_entry" aria-label="Default select example" name="insp_fmember_name[]" id="insp_fmember_name_${sno}">
                      <option value="" selected>-</option>
                    </select>
              </div>
              <div class="col-lg-12 mb-2 mx-2">
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">வயது</label>
                  <input type="number" class="form-control number fmember_age" placeholder="" name="insp_fmember_age[]" onKeyPress="if(this.value.length==3) return false;">
              </div>
               <div class="col-lg-12 mb-2 mx-2">
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">தொழில்</label>
                  <select class="form-select append_insp_occupation" aria-label="Default select example" name="insp_fmember_occupation[]">
                    <option value="" selected>-</option>
                  </select>
              </div>
              <div class="col-lg-12 mb-2 mx-2">
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">மாத வருமானம் </label>
                  <input type="number" class="form-control insp_indiv_income" placeholder="" onKeyPress="if(this.value.length==9) return false;" name="insp_fmember_income_m[]">
                  <small class='d-none ruppee_converter' id=""></small>
              </div></div>`;
  $("#insp_family_members_content").append(via_tr);
  $(".append_insp_occupation").append(occupation_option);
  $(".append_family_member_name").append(family_info_option);
});
$("body").on("click", ".del_fmember_div", function () {
  var len = $(".insp_indiv_income").length;
  if (len == 1) {
    alert("Atleast one family member to be visible");
  } else {
    $(this).closest("div").remove();
    $("#insp_add_fam_mem").removeClass("d-none");
    $(".insp_indiv_income").trigger("change");
  }
});
//3. வாகனம் பற்றிய கணினித் தரவு தகவலை விண்ணப்பதாரர் ஏற்கிறாரா? :
function veh_accept(element) {
  if (element.value == "yes") {
    $("#vech_no_reason").val("");
    $("#vec_no_div").addClass("d-none");
    $("#vech_no_reason").rules("remove", "required");
    if ($("#vehicle_available").val() == "Yes") {
      $("#applicant_four_wheeler").prop("checked", true);
      $("#applicant_four_wheeler").parent().addClass("prevent_click");
    }
  } else if (element.value == "no") {
    $("#vec_no_div").removeClass("d-none");
    $("#vech_no_reason").rules("add", "required");
    $("#applicant_four_wheeler").prop("checked", false);
    $("#applicant_four_wheeler").parent().removeClass("prevent_click");
  }
  $("#applicant_four_wheeler").trigger("change");
}

//விண்ணப்பதாரர் குடும்பத்தில் 4 சக்கர :
function vech_insp_ack_check(element) {
  if (element.value == "yes") {
    $(".vech_insp_ack_yes_div").removeClass("d-none");
    $("#vech_insp_ack_num").rules("add", "required");
    //$('#applicant_four_wheeler').attr('checked', 'checked');
    $("#applicant_four_wheeler").prop("checked", true);
    $("#applicant_four_wheeler").parent().addClass("prevent_click");
  } else if (element.value == "no") {
    $("#vech_insp_ack_num").val("");
    $(".vech_insp_ack_yes_div").addClass("d-none");
    $("#vech_insp_ack_num").rules("remove", "required");
    //$('#applicant_four_wheeler').attr('checked', false);
    $("#applicant_four_wheeler").prop("checked", false);
    $("#applicant_four_wheeler").parent().removeClass("prevent_click");
  }
  $("#applicant_four_wheeler").trigger("change");
}

//11(a). குடும்ப உறுப்பினர்களுக்கு சொந்த நிலம் உள்ளதா?
function land_avail(element) {
  if (element.value == "no") {
    $(".land_avail_div").addClass("d-none");
    $('input[name^="insp_5acre"]').rules("remove", "required");
    $('input[name^="insp_10acre"]').rules("remove", "required");
    $("#insp_5acre_yes").prop("checked", false);
    $("#insp_5acre_no").prop("checked", false);
    $("#insp_10acre_yes").prop("checked", false);
    $("#insp_10acre_no").prop("checked", false);
    $("#area_nanchai").val("");
    $("#area_punchai").val("");
  } else if (element.value == "yes") {
    $(".land_avail_div").removeClass("d-none");
    $('input[name^="insp_5acre"]').rules("add", "required");
    $('input[name^="insp_10acre"]').rules("add", "required");
  }
}
//3. நிலம் பற்றிய கணினித் தரவு  தகவலை விண்ணப்பதாரர் ஏற்கிறாரா?
function land_accept(element) {
  if (element.value == "yes") {
    $("#sys_land_not_accept").addClass("d-none");
    $("#sys_land_not_accept").val("");
    $("#sys_land_not_accept").rules("remove", "required");

    if ($("#land_available").val() == "Yes") {
      //$('#applicant_land_exceed').attr('checked', 'checked');
      $("#applicant_land_exceed").prop("checked", true);
      $("#applicant_land_exceed").parent().addClass("prevent_click");
    }
  } else if (element.value == "no") {
    $("#sys_land_not_accept").removeClass("d-none");
    $("#sys_land_not_accept").rules("add", "required");
    //$('#applicant_land_exceed').attr('checked', false);
    $("#applicant_land_exceed").prop("checked", false);
    $("#applicant_land_exceed").parent().removeClass("prevent_click");
  }
  $("#applicant_land_exceed").trigger("change");
}

//12. வங்கி கணக்கு விவரம்...
function applicant_accept_bank(element) {
  if (element.value == "yes") {
    $("#applicant_bank_details_accept_no").addClass("d-none");
    $("#applicant_bank_details_accept_no").addClass("d-none");
    $("#applicant_bank_account_no").val("");
    $("#applicant_bank_name").selectpicker("destroy");
    $("#applicant_bank_name").val("");
    $("#applicant_bank_name").selectpicker("render");

    $("#applicant_bank_account_ifsc").selectpicker("destroy");
    $("#applicant_bank_account_ifsc").empty();
    $("#applicant_bank_account_ifsc").append('<option value="">-</option>');
    $("#applicant_bank_account_ifsc").selectpicker("render");

    //$('#applicant_bank_account_ifsc2').val('');
    $("#applicant_bank_account_no").rules("remove", "required");
    $("#applicant_bank_name").rules("remove", "required");
    $("#applicant_bank_account_ifsc").rules("remove", "required");

    $("#applicant_bank_account_ifsc1").rules("remove", "required");
    $("#applicant_bank_account_ifsc1").val("");
    $(".enter_bank").addClass("d-none");
    $("#applicant_bank_account_ifsc1").addClass("d-none");

    $("#applicant_bank_name1").rules("remove", "required");
    $("#applicant_bank_name1").val("");
    $(".enter_ifsc").addClass("d-none");
    $("#applicant_bank_name1").addClass("d-none");
  } else if (element.value == "no") {
    $("#applicant_bank_details_accept_no").removeClass("d-none");
    $("#applicant_bank_account_no").rules("add", "required");
    $("#applicant_bank_name").rules("add", "required");
    $("#applicant_bank_account_ifsc").rules("add", "required");
    //$('#applicant_bank_account_ifsc2').rules('add',  'required')
  }
}
$("body").on("change", "#applicant_bank_account_ifsc", function () {
  if ($(this).val() == "others") {
    $("#applicant_bank_account_ifsc1").removeClass("d-none");
    $(".enter_ifsc").removeClass("d-none");
    $("#applicant_bank_account_ifsc1").rules("add", "required");
  } else {
    $("#applicant_bank_account_ifsc1").addClass("d-none");
    $(".enter_ifsc").addClass("d-none");
    $("#applicant_bank_account_ifsc1").val("");
    $("#applicant_bank_account_ifsc1").rules("remove", "required");
  }
});

//14. a) ஆம் எனில், தற்பொழுது வங்கி கடன் தவணை செலுத்துகிறீர்களா ?
function emi_paying_check(element) {
  if (element.value == "no") {
    $(".pie_loan_income_yes").addClass("d-none");
    $(".pie_emi_paying_yes").addClass("d-none");
    $('input[name^="current_emi_paying"]').rules("remove", "required");
    //$('input[name^="emi_amount_paying"]').rules('remove',  'required')
    $("#current_emi_paying_yes").prop("checked", false);
    $("#current_emi_paying_no").prop("checked", false);
    $("#emi_amount_paying_known").prop("checked", false);
    $("#emi_amount_paying_not_known").prop("checked", false);
    $("#loan_emi_payment").val("");
    $("#loan_emi_payment").attr("readonly", true);
    $("#loan_emi_payment").rules("remove", "required");
  } else if (element.value == "yes") {
    $(".pie_loan_income_yes").removeClass("d-none");
    $('input[name^="current_emi_paying"]').rules("add", "required");
    //$('input[name^="emi_amount_paying"]').rules('add',  'required')
  }
}
//14. b) எவ்வளவு வங்கிக் கடன் மாதத் தவணை செலுத்துகிறீர்கள் ?
function declare_emi_amount(element) {
  if (element.value == "yes") {
    $(".pie_emi_paying_yes").removeClass("d-none");

    $("#loan_emi_payment").attr("readonly", false);
    $("#loan_emi_payment").rules("add", "required");
  } else if (element.value == "no") {
    $("#loan_emi_payment").val("");
    $(".pie_emi_paying_yes").addClass("d-none");
    $("#loan_emi_payment").attr("readonly", true);
    $("#loan_emi_payment").rules("remove", "required");
  }
}
//15. விண்ணப்பதாரர் குடும்பத்தில் மாநில அரசு, ஒன்றிய.....
function applicant_govt_job_check(element) {
  if (element.value == "no") {
    $(".applicant_govt_job_yes_div").addClass("d-none");
    $("#govt_fmember_name").val("");
    $("#govt_fmember_occu").val("");
    $("#govt_fmember_name").rules("remove", "required");
    $("#govt_fmember_occu").rules("remove", "required");

    //$('#applicant_govt_employee').attr('checked', false);
    $("#applicant_govt_employee").prop("checked", false);
    $("#applicant_govt_employee").parent().removeClass("prevent_click");
  } else if (element.value == "yes") {
    $(".applicant_govt_job_yes_div").removeClass("d-none");
    $("#govt_fmember_name").rules("add", "required");
    $("#govt_fmember_occu").rules("add", "required");

    //$('#applicant_govt_employee').attr('checked', 'checked');
    $("#applicant_govt_employee").prop("checked", true);
    $("#applicant_govt_employee").parent().addClass("prevent_click");
  }
  //check_eligible(element.value,'applicant_govt_employee');
  $("#applicant_govt_employee").trigger("change");
}
//16. விண்ணப்பதாரர் குடும்பத்தில் .....
function applicant_exservice_check(element) {
  if (element.value == "no") {
    $(".applicant_ex_service_yes_div").addClass("d-none");
    $("#ex_service_fmember_name").val("");
    $("#ex_service_fmember_occu").val("");
    $("#ex_service_fmember_name").rules("remove", "required");
    $("#ex_service_fmember_occu").rules("remove", "required");

    //$('#applicant_ex_servicemen').attr('checked', false);
    $("#applicant_ex_servicemen").prop("checked", false);
    $("#applicant_ex_servicemen").parent().removeClass("prevent_click");
  } else if (element.value == "yes") {
    $(".applicant_ex_service_yes_div").removeClass("d-none");
    $("#ex_service_fmember_name").rules("add", "required");
    $("#ex_service_fmember_occu").rules("add", "required");

    //$('#applicant_ex_servicemen').attr('checked', 'checked');
    $("#applicant_ex_servicemen").prop("checked", true);
    $("#applicant_ex_servicemen").parent().addClass("prevent_click");
  }
  //check_eligible(element.value,'applicant_ex_servicemen');
  $("#applicant_ex_servicemen").trigger("change");
}
//17. விண்ணப்பதாரரின் குடும்பத்தில் யாரேனும் .....
function applicant_income_check(element) {
  if (element.value == "no") {
    $(".applicant_income_exceed_yes_div").addClass("d-none");
    $("#applicant_income_tax_pay").val("");
    $("#applicant_income_tax_file").val("");
    $("#applicant_income_tax_pay").rules("remove", "required");
    $("#applicant_income_tax_file").rules("remove", "required");

    //$('#applicant_tax_payee').attr('checked', false);
    $("#applicant_tax_payee").prop("checked", false);
    $("#applicant_tax_payee").parent().removeClass("prevent_click");
  } else if (element.value == "yes") {
    $(".applicant_income_exceed_yes_div").removeClass("d-none");
    $("#applicant_income_tax_pay").rules("add", "required");
    $("#applicant_income_tax_file").rules("add", "required");

    //$('#applicant_tax_payee').attr('checked', 'checked');
    $("#applicant_tax_payee").prop("checked", true);
    $("#applicant_tax_payee").parent().addClass("prevent_click");
  }
  //check_eligible(element.value,'applicant_tax_payee');
  $("#applicant_tax_payee").trigger("change");
}
//18. விண்ணப்பதாரர் குடும்பத்தில் யாரேனும் .....
function applicant_pt_check(element) {
  if (element.value == "no") {
    $(".applicant_pt_yes_div").addClass("d-none");
    $("#applicant_pt_fmember_name").val("");
    $("#applicant_pt_fmember_occu").val("");
    $("#applicant_pt_fmember_name").rules("remove", "required");
    $("#applicant_pt_fmember_occu").rules("remove", "required");

    //$('#applicant_pt_payee').attr('checked', false);
    $("#applicant_pt_payee").prop("checked", false);
    $("#applicant_pt_payee").parent().removeClass("prevent_click");
  } else if (element.value == "yes") {
    $(".applicant_pt_yes_div").removeClass("d-none");
    $("#applicant_pt_fmember_name").rules("add", "required");
    $("#applicant_pt_fmember_occu").rules("add", "required");

    //$('#applicant_pt_payee').attr('checked', 'checked');
    $("#applicant_pt_payee").prop("checked", true);
    $("#applicant_pt_payee").parent().addClass("prevent_click");
  }
  $("#applicant_pt_payee").trigger("change");
}
//19.  விண்ணப்பதாரர் குடும்பத்தில் ஆண்டுக்கு 50 இலட்சத்திற்கு .....
function applicant_gst_check(element) {
  if (element.value == "no") {
    $(".applicant_gst_div").addClass("d-none");
    $("#applicant_gst_fmember_name").val("");
    $("#applicant_gst_gstno").val("");
    $("#applicant_gst_fmember_name").rules("remove", "required");
    $("#applicant_gst_gstno").rules("remove", "required");

    //$('#applicant_gst_payee').attr('checked', false);
    $("#applicant_gst_payee").prop("checked", false);
    $("#applicant_gst_payee").parent().removeClass("prevent_click");
  } else if (element.value == "yes") {
    $(".applicant_gst_div").removeClass("d-none");
    $("#applicant_gst_fmember_name").rules("add", "required");
    $("#applicant_gst_gstno").rules("add", "required");

    //$('#applicant_gst_payee').attr('checked', 'checked');
    $("#applicant_gst_payee").prop("checked", true);
    $("#applicant_gst_payee").parent().addClass("prevent_click");
  }
  $("#applicant_gst_payee").trigger("change");
}
//20. விண்ணப்பதாரர் குடும்பத்தில் தேர்ந்தெடுக்கப்பட்ட மக்கள் பிரதிநிதிகள் .....
function applicant_elected_check(element) {
  if (element.value == "no") {
    $(".applicant_elected_div").addClass("d-none");
    $("#applicant_elected_fmember_name").val("");
    $("#applicant_elected_post").val("");
    $("#applicant_elected_fmember_name").rules("remove", "required");
    $("#applicant_elected_post").rules("remove", "required");

    //$('#applicant_elected_body').attr('checked', false);
    $("#applicant_elected_body").prop("checked", false);
    $("#applicant_elected_body").parent().removeClass("prevent_click");
  } else if (element.value == "yes") {
    $(".applicant_elected_div").removeClass("d-none");
    $("#applicant_elected_fmember_name").rules("add", "required");
    $("#applicant_elected_post").rules("add", "required");

    //$('#applicant_elected_body').attr('checked', 'checked');
    $("#applicant_elected_body").prop("checked", true);
    $("#applicant_elected_body").parent().addClass("prevent_click");
  }
  $("#applicant_elected_body").trigger("change");
}
//21. விண்ணப்பதாரர் குடும்பத்தில்  விதவையர் ஓய்வூதியம் .....
function applicant_pension_check(element) {
  if (element.value == "no") {
    $(".applicant_pension_div").addClass("d-none");
    $("#applicant_pension_fmember_name").val("");
    $("#applicant_pension_receiving").val("");
    $("#applicant_pension_fmember_name").rules("remove", "required");
    $("#applicant_pension_receiving").rules("remove", "required");

    //$('#applicant_pension_beneficiary').attr('checked', false);
    $("#applicant_pension_beneficiary").prop("checked", false);
    $("#applicant_pension_beneficiary").parent().removeClass("prevent_click");
  } else if (element.value == "yes") {
    $(".applicant_pension_div").removeClass("d-none");
    $("#applicant_pension_fmember_name").rules("add", "required");
    $("#applicant_pension_receiving").rules("add", "required");

    //$('#applicant_pension_beneficiary').attr('checked', 'checked');
    $("#applicant_pension_beneficiary").prop("checked", true);
    $("#applicant_pension_beneficiary").parent().addClass("prevent_click");
  }
  $("#applicant_pension_beneficiary").trigger("change");
}
//22. விண்ணப்பதாரர் குறித்து கணினித் தரவு தகவல்கள் தகவல்கள் சரியாக .....
function applicant_sys_gen_check(element) {
  if (element.value == "true") {
    $(".applicant_sys_gen_correct_div").addClass("d-none");
    $("#applicant_sys_gen_specify").selectpicker("destroy");
    $("#applicant_sys_gen_specify").val("");
    $("#applicant_sys_gen_specify").selectpicker("render");
    $("#applicant_sys_gen_specify").rules("remove", "required");
  } else if (element.value == "false") {
    $(".applicant_sys_gen_correct_div").removeClass("d-none");
    $("#applicant_sys_gen_specify").rules("add", "required");
  }
}
//23.விண்ணப்பதாரர் தரும் தகவல் சரியானதா ? .....
function applicant_given_info_check(element) {
  if (element.value == "true") {
    $(".applicant_given_info_div").addClass("d-none");
    $("#applicant_given_info_select").selectpicker("destroy");
    $("#applicant_given_info_select").val("");
    $("#applicant_given_info_select").selectpicker("render");
    $("#applicant_given_info_select").rules("remove", "required");
  } else if (element.value == "false") {
    $(".applicant_given_info_div").removeClass("d-none");
    $("#applicant_given_info_select").rules("add", "required");
  }
}
//24. ஆய்வு அலுவலர் கருத்தின்படி விண்ணப்பதாரர் திட்டத்தில் .....
function applicant_eligible_check(element) {
  if (element.value == "true") {
    $(".applicant_eligible_div").addClass("d-none");
  } else if (element.value == "false") {
    $(".applicant_eligible_div").removeClass("d-none");
  }
}
//check eligible based on value
function check_eligible(value, check_box_id) {
  checked_radio_yes_option = [];
  $(".radio_check_eligiblity:checked").each(function () {
    var selected_val = $(this).val();
    if (selected_val == "yes") {
      $(".applicant_eligible_div").removeClass("d-none");
      $("#applicant_eligible_no").prop("checked", true);
      $("#" + check_box_id).attr("checked", "checked");
      $("#" + check_box_id)
        .parent()
        .addClass("prevent_click");
      checked_radio_yes_option.push(selected_val);
    } else {
      $("#" + check_box_id).removeAttr("checked");
      $("#" + check_box_id)
        .parent()
        .removeClass("prevent_click");
    }
    if (jQuery.inArray("yes", checked_radio_yes_option) !== -1) {
    } else {
      $("#applicant_eligible_no").prop("checked", false);
      $("#applicant_eligible_yes").prop("checked", false);
      $(".applicant_eligible_div").addClass("d-none");
    }
  });
}
$(".not_eligible_reason").change(function () {
  if ($(".not_eligible_reason:checked").length > 0) {
    // any one is checked
    $("#applicant_eligible_no").prop("checked", true);
    $(".applicant_eligible_div").removeClass("d-none");
    $(".beneficiary_eligible_check_div").addClass("prevent_click");
  } else {
    // none is checked
    $("#applicant_eligible_no").prop("checked", false);
    $("#applicant_eligible_yes").prop("checked", false);
    $(".applicant_eligible_div").addClass("d-none");
    $(".beneficiary_eligible_check_div").removeClass("prevent_click");
  }
});
// $('#applicant_sys_gen_specify').on('change', function () {
//     var val = $(this).val();
//     val.forEach(function (select) {
//         if (select == 90) {
//             Swal.fire({
//                 title: 'Please Confirm!',
//                 text: "Do you want to Reject the application",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#2ECB3F',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Confirm',
//                 customClass: 'invalid_check_button',
//                 allowOutsideClick: false
//             }).then((result) => {
//                 if (result.value) {

//                  invalid_submitForm();
//                 }
//                 else {
//                     Swal.fire(
//                         'Request Cancelled'
//                     )
//                     $('#applicant_sys_gen_specify').selectpicker('destroy');
//                     $('#applicant_sys_gen_specify').val('');
//                     $('#applicant_sys_gen_specify').selectpicker('render');
//                 }
//             });
//         }
//     });
// })
var user_details = JSON.parse(
  window.localStorage.getItem("user_details_kmut_verification")
);
var api_log_user_id = user_details.user_id;
function getdropdown(form_name = null) {
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
      //console.log(result);

      //$('.insp_occupation').empty();
      var data = result[0].data.dropdown_list;
      var pt_occupation = "";
      var workplace_option = "";
      var electricity_option = "";
      var vechicle_option = "";
      var land_option = "";
      var elected_option = "";
      var pension_option = "";
      var insp_officer_option = "";
      var eb_region_option = "";
      var rejectionReasons = "";
      data.forEach(function (select) {
        if (select.category == "Occupation") {
          occupation_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "PT Occupation") {
          pt_occupation += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "Inspection officer information") {
          workplace_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "House Type") {
          electricity_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "Vehicle details") {
          vechicle_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "Land details") {
          land_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "Elected details") {
          elected_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "Pension details") {
          pension_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "Inspecting officer comment") {
          insp_officer_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "EB Region") {
          eb_region_option += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        } else if (select.category == "Rejection Reasons") {
          rejectionReasons += `<option value='${select.value}'>${select.display_text_tamil}</option>`;
        }
      });

      // $('.insp_occupation').append(occupation_option);

      $(".insp_pt_occupation").append(pt_occupation);
      $(".insp_workplace").append(workplace_option);
      $(".ddl_house_type").append(electricity_option);
      $(".ddl_vechicle_details").append(vechicle_option);
      $(".ddl_land_type_list").append(land_option);
      $(".ddl_elected_list").append(elected_option);
      $(".ddl_pension_list").append(pension_option);
      $(".rejection_details").append(rejectionReasons);

      $(".ddl_off_comment_list").selectpicker("destroy");
      $(".ddl_off_comment_list").empty();
      $(".ddl_off_comment_list").append(insp_officer_option);
      $(".ddl_off_comment_list").selectpicker("render");

      // $('.region_no').append(eb_region_option);
      $(".applicant_eligible_div .col-lg-12").empty();

      // Add Label
      $(".applicant_eligible_div .col-lg-12").append(`
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">24.a. இல்லை எனில் காரணம்:</label>
            `);

      // Generate Checkboxes for "Not Eligible Details"
      data.forEach(function (item) {
        if (item.category === "Complaint Reason") {
          var checkbox = `
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
          $(".applicant_eligible_div .col-lg-12").append(checkbox);
        }
      });
    },
    complete: function () {
      if (typeof getPrefilledData === "function") {
        getPrefilledData(occupation_option);
      }
      if (typeof getFamilyMember === "function") {
        getFamilyMember();
      }
    },
  });
}
//bank name list
var bank_name_list = window.localStorage.getItem("kmut_verification_bank_name");
if (bank_name_list) {
  //console.log(bank_name_list)
  $(".ddl_bank_name_list").selectpicker("destroy");
  $(".ddl_bank_name_list").append(bank_name_list);
  $(".ddl_bank_name_list").selectpicker("render");
} else {
  getbank_name();
}
//bank name list
function getbank_name() {
  $.ajax({
    type: "POST",
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": "KMUT Verification App",
    },
    url: config.api_url + "/data_entry/getbankname",
    data: {
      category: "bank_name",
      user_id: api_log_user_id,
    },
    dataType: "json",
    success: function (result) {
      var option = "";
      var data = result.data.bank_name_list;
      data.forEach(function (select) {
        option += `<option value='${select.bankname.toLowerCase()}'>${
          select.bankname
        }</option>`;
      });
      $(".ddl_bank_name_list").selectpicker("destroy");
      $(".ddl_bank_name_list").append(option);
      $(".ddl_bank_name_list").append('<option value="others">Others</option>');
      option += `<option value="others">Others</option>`;
      window.localStorage.setItem("kmut_verification_bank_name", option);
      $(".ddl_bank_name_list").selectpicker("render");
    },
  });
}
$("#search_ration_number").on("click", function () {
  if ($("#ration_number").val() == "") {
    alert("Please enter ration card number");
  } else {
    var application_id = window.localStorage.getItem("application_id");
    $("#search_ration_number").addClass("prevent_click");
    $.ajax({
      type: "POST",
      headers: {
        "X-APP-KEY": config.app_key,
        "X-APP-NAME": "KMUT Verification App",
      },
      //  url: config.api_url + '/data_entry/application_details',
      data: {
        ufc: $("#ration_number").val(),
        application_id: application_id,
        user_id: api_log_user_id,
      },
      dataType: "json",
      success: function (result) {
        reset_application_data();
        $("#search_ration_number").removeClass("prevent_click");
        if (result.success == 0) {
        } else {
          var personal_details = result.data.application_data.basic_details; //applicantion_data
          var ration_card_details =
            result.data.application_data.ration_card_details;
          var family_details = result.data.application_data.family_details;
          $("#result_ration_card").text(personal_details.tnega_ufc);
          $("#result_person_name").text(
            personal_details.applicant_fullname.toLowerCase()
          );
          $("#result_dob").text(
            personal_details.dob == null ? "-" : personal_details.dob
          );
          $("#result_gender").text(personal_details.applicant_gender);
          $("#result_mobileno").text(personal_details.applicant_mobile);
          $("#result_address").text(personal_details.address);
          $("#application_monthly_income").text(
            personal_details.family_monthly_income
          );
          $("#appl_eb_meter_number").text(
            personal_details.applicant_ebcard_no == null
              ? "-"
              : personal_details.applicant_ebcard_no
          );
          if (personal_details.applicant_current_housetype == "Own") {
            $(".ddl_house_type").val(14);
          } else if (personal_details.applicant_current_housetype == "Rental") {
            $(".ddl_house_type").val(15);
          } else {
            $(".ddl_house_type").val("");
          }
          //4 wheeler application
          if (personal_details.is_applicant_have_4wheelvehicle == "Yes") {
            $("#applicant_four_wheeler_declare").text("ஆம்");
            $('input[name^="insp_veh_accept"]').rules("add", "required");
          } else if (personal_details.is_applicant_have_4wheelvehicle == "No") {
            $("#applicant_four_wheeler_declare").text("இல்லை");
            $(".four_wheel_system_generated").addClass("d-none");
            $(".applicant_vech_no_declare_div").removeClass("d-none");
            $('input[name^="vech_insp_ack"]').rules("add", "required");
          } else {
            $("#applicant_four_wheeler_declare").text(
              personal_details.is_applicant_have_4wheelvehicle == null
                ? "-"
                : personal_details.is_applicant_have_4wheelvehicle
            );
            $(".four_wheel_system_generated").addClass("d-none");
          }
          //land detail application
          if (personal_details.is_applicant_have_ownland == "Yes") {
            $("#applicant_own_land_declare").text("ஆம்");
            //$('input[name^="sys_land_accept"]').rules('add',  'required')
          } else if (personal_details.is_applicant_have_ownland == "No") {
            $("#applicant_own_land_declare").text("இல்லை");
            $(".land_info_sys_generated").addClass("d-none");
          } else {
            $("#applicant_own_land_declare").text(
              personal_details.is_applicant_have_ownland == null
                ? "-"
                : personal_details.is_applicant_have_ownland
            );
          }

          var famil_details_div = "";
          var famil_insp_div = "";
          $("#appl_family_members_content").empty();
          if (family_details.length == 0) {
            famil_details_div += `<div><div class="col-lg-12 mb-2 mx-2">
                        <label for="depName" class="form-label mb-0 w-100 p-1 font-14">விண்ணப்பதாரரின் குடும்ப உறுப்பினர் விவரங்கள் தரப்படவில்லை</label>
                      </div>`;
          } else {
            for (var i = 0; i < family_details.length; i++) {
              famil_details_div += `
                            
                            <div>
                        
                            <div class="col-lg-12 mb-2 mx-2">
                        <label for="depName" class="form-label mb-0 w-100 p-1 font-14">குடும்ப உறுப்பினர் பெயர் ${
                          i + 1
                        }</label>
                        <label for="depName" class="form-label mb-0 w-100 p-1 font-14 captialise_first">${
                          family_details[i].name == null
                            ? "-"
                            : family_details[i].name.toLowerCase()
                        }</label>
                      </div>
                      <div class="col-lg-12 mb-2 mx-2">
                        <label for="depName" class="form-label mb-0 w-100 p-1 font-14">வயது</label>
                        <label for="depName" class="form-label mb-0 w-100 p-1 font-14">${
                          family_details[i].age == null
                            ? "-"
                            : family_details[i].age
                        }</label>
                          
                      </div>
                       <div class="col-lg-12 mb-2 mx-2">
                        <label for="depName" class="form-label mb-0 w-100 p-1 font-14">தொழில்</label>
                            <label for="depName" class="form-label mb-0 w-100 p-1 font-14">${
                              family_details[i].occupation == null
                                ? "-"
                                : family_details[i].occupation
                            }</label>
                      </div>
                      <div class="col-lg-12 mb-2 mx-2">
                        <label for="depName" class="form-label mb-0 w-100 p-1 font-14">மாத வருமானம் </label>
                            <label for="depName" class="form-label mb-0 w-100 p-1 font-14">${
                              family_details[i].monthly_income == null
                                ? "-"
                                : family_details[i].monthly_income
                            }</label>
                      </div></div>`;
              famil_insp_div += `<div>
                        <div class="col-lg-12 mb-2 mx-2">
                          <label for="depName" class="form-label mb-0 w-100 p-1 font-14">குடும்ப உறுப்பினர் பெயர் ${
                            i + 1
                          }<span style="color:red">&#42;</span></label>
                            <select class="form-select family_member_name" aria-label="Default select example" name="insp_fmember_name[]" id="insp_fmember_name_${i}">
                              <option value="" selected>-</option>
                            </select>
                        </div>
                        <div class="col-lg-12 mb-2 mx-2">
                          <label for="depName" class="form-label mb-0 w-100 p-1 font-14">வயது<span style="color:red">&#42;</span></label>
                            <input type="number" class="form-control number" placeholder="" name="insp_fmember_age[]" id="insp_fmember_age_${i}">
                        </div>
                         <div class="col-lg-12 mb-2 mx-2">
                          <label for="depName" class="form-label mb-0 w-100 p-1 font-14">தொழில்<span style="color:red">&#42;</span></label>
                            <select class="form-select insp_occupation" aria-label="Default select example" name="insp_fmember_occupation[]" id="insp_fmember_occupation_${i}">
                              <option value="" selected>-</option>
                            </select>
                        </div>
                        <div class="col-lg-12 mb-2 mx-2">
                          <label for="depName" class="form-label mb-0 w-100 p-1 font-14">மாத வருமானம்<span style="color:red">&#42;</span> </label>
                            <input type="number" class="form-control insp_indiv_income" placeholder="" onKeyPress="if(this.value.length==9) return false;" name="insp_fmember_income_m[]" id="insp_fmember_income_m_${i}">
                            <small class='d-none ruppee_converter' id=""></small>
                        </div>
                       
                      </div>
                          `;
              //family_info_option += `<option value='${family_details[i].name.toLowerCase()}'>${family_details[i].name.toLowerCase()}</option>`;
            }
          }
          $("#appl_family_members_content").append(famil_details_div);

          $("#aadhaar_no").val(
            personal_details.aadhaar == null ? "" : personal_details.aadhaar
          );
          //$('#personalinfo_id').val(personal_details.personalinfo_id== null ? '' : personal_details.personalinfo_id);//changing to tnega_ufc because of backend error
          //$('#rationcard_no').val(personal_details.applicant_rationcard_no);//changing to tnega_ufc because of backend error
          $("#personalinfo_id").val(
            personal_details.personalinfo_id == null
              ? "0"
              : personal_details.personalinfo_id
          );
          $("#rationcard_no").val(personal_details.tnega_ufc);
          $("#ration_no_display").append(
            personal_details.tnega_ufc +
              ", " +
              personal_details.applicant_fullname.toLowerCase() +
              ", " +
              personal_details.applicant_mobile
          );
          $("#name").val(personal_details.applicant_fullname.toLowerCase());
          $("#dob").val(personal_details.dob);
          $("#gender").val(personal_details.applicant_gender_id);
          $("#result_mobileno").val(personal_details.applicant_mobile);
          $("#mobile_no").val(personal_details.applicant_mobile);
          /*$('#monthly_income').val(personal_details.family_monthly_income);*/
          $("#vehicle_available").val(
            personal_details.is_applicant_have_4wheelvehicle == null
              ? ""
              : personal_details.is_applicant_have_4wheelvehicle
          );
          $("#land_available").val(
            personal_details.is_applicant_have_ownland == null
              ? ""
              : personal_details.is_applicant_have_ownland
          );
          $("#application_id").val(personal_details.application_id);
          var user_details = JSON.parse(
            window.localStorage.getItem("user_details_kmut_verification")
          );
          var shop_code = user_details.shop_code;
          $("#tnega_shopcode").val(personal_details.tnega_shopcode);

          var rejectiondetails_result =
            result.data.application_data.rejectiondetails_result;
          if (rejectiondetails_result) {
            $("#others-modal-id").empty();
            rejectiondetails_result.forEach(function (select) {
              if (select.icon) {
                $("#reason_info").removeClass("d-none");
                $("#others-modal-id").append(
                  `<img src="assets/img/icons/${select.icon}.svg" class="icon-view mb-2" alt="icons">`
                );
              }
            });
          }
        }
      },
      error: function (data, textStatus, http) {
        $("#preloader").hide();

        if (data.responseJSON?.success === 0) {
          Swal.fire({
            icon: "error", // Add an error icon for clarity
            title: "Error",
            text: data.responseJSON.message || "Something went wrong!",
          });
        }
      },
    });
  }
});

function reset_application_data() {
  $("#result_ration_card").text("");
  $("#result_aadhar_card").text("");
  $("#result_person_name").text("");
  $("#result_dob").text("");
  $("#result_gender").text("");
  $("#result_mobileno").text("");
  $("#result_address").text("");
  $("#appl_eb_meter_number").text("");
}
function post_invalid_form() {
  $(".swal2-styled").attr("disabled", true);
  var form_data_invalid = new FormData();
  form_data_invalid.append("personalinfo_id", $("#personalinfo_id").val());
  form_data_invalid.append("application_id", $("#application_id").val());
  form_data_invalid.append("rationcard_no", $("#rationcard_no").val());
  form_data_invalid.append("aadhaar_no", $("#aadhaar_no").val());
  form_data_invalid.append("name", $("#name").val());
  form_data_invalid.append("dob", $("#dob").val());
  form_data_invalid.append("gender", $("#gender").val());
  form_data_invalid.append("mobile_no", $("#mobile_no").val());
  form_data_invalid.append(
    "monthly_income",
    $("#insp_family_monthly_income").val()
  );
  form_data_invalid.append("house_type", $("#insp_house_type").val());
  form_data_invalid.append("invalid_applicantion", "yes");
  form_data_invalid.append("user_id", $("#user_id").val());
  form_data_invalid.append(
    "applicant_sys_gen_correct",
    $('input[name^="applicant_sys_gen_correct"]:checked').val()
  );
  //form_data_invalid.append("applicant_given_info",$('input[name^="applicant_given_info"]:checked').val());
  form_data_invalid.append(
    "applicant_sys_gen_specify",
    $("#applicant_sys_gen_specify").val()
  );
  //form_data_invalid.append("applicant_given_info_select",$('#applicant_given_info_select').val());
  form_data_invalid.append("district_code", $("#district_code").val());
  form_data_invalid.append("taluk_code", $("#taluk_code").val());
  form_data_invalid.append("village_id", 0);
  form_data_invalid.append(
    "attachment_latitude",
    $("#house_photo_latitude").val()
  );
  form_data_invalid.append(
    "attachment_longitude",
    $("#house_photo_longitude").val()
  );
  $.ajax({
    type: "POST",
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": "KMUT Verification App",
    },
    url: config.api_url + "/data_entry/add_invalid_application_data",
    data: form_data_invalid,
    processData: false,
    contentType: false,
    dataType: "json",
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener(
        "progress",
        function (evt) {
          if (evt.lengthComputable) {
            resetProgressBar();
            $(".upload-progress-bar").show();
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            $(".upload-progress").text(percentComplete + "%");
            $(".upload-progress").css("width", percentComplete + "%");
            if (percentComplete >= 100) {
              $(".upload-progress").text("Processing...Please Wait");
            }
          }
        },
        false
      );
      return xhr;
    },
    success: function (response) {
      var res = response.success;
      //console.log(res);
      if (res == true) {
        Swal.fire({
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
        }).then(function () {
          window.location.href = "./details.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Please try again!!" + response.message,
          showConfirmButton: false,
          timer: 5000,
        }).then(function () {
          location.reload();
        });
      }
      resetProgressBar();
    },
    error: function (errorThrown) {
      message = errorThrown.responseJSON[0].message;
      Swal.fire({
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 5000,
      }).then(function () {
        //location.reload();
        $(".swal2-styled").attr("disabled", false);
        resetProgressBar();
      });
    },
  });
}
function get_data_purity() {
  //data purity data
  $.ajax({
    type: "POST",
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": "KMUT Verification App",
    },
    url: config.api_url + "/data_entry/benificiary_master",
    data: {
      ufc: $("#ration_number").val(),
      user_id: api_log_user_id,
    },
    dataType: "json",
    success: function (result) {
      if (result.success == 0) {
      } else {
        var benef_data = result.data;
        var via_tr = "";
        $("#insp_family_members_content").empty();
        $.each(benef_data.pds_family_member.split("|"), function (idx, val) {
          family_member_name.push(val);
          family_info_option += `<option value='${val.toLowerCase()}'>${val.toLowerCase()}</option>`;
          via_tr = `<div><a href='javascript:void(0)' class='del_fmember_div' style='color:red;text-decoration:none;'><i class='bi bi-dash-circle-fill'></i> Delete </a><div class="col-lg-12 mb-2 mx-2">
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">குடும்ப உறுப்பினர் பெயர்</label>
                    <input type="text" class="form-control prevent_click" placeholder="" name="insp_fmember_name[]" id="insp_fmember_name_${++idx}" value="${val.toLowerCase()}">
              </div>
              <div class="col-lg-12 mb-2 mx-2">
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">வயது</label>
                  <input type="number" class="form-control number fmember_age" placeholder="" name="insp_fmember_age[]" onKeyPress="if(this.value.length==3) return false;">
              </div>
               <div class="col-lg-12 mb-2 mx-2">
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">தொழில்</label>
                  <select class="form-select append_insp_occupation" aria-label="Default select example" name="insp_fmember_occupation[]">
                    <option value="" selected>-</option>
                  </select>
              </div>
              <div class="col-lg-12 mb-2 mx-2">
                <label for="depName" class="form-label mb-0 w-100 p-1 font-14">மாத வருமானம் </label>
                  <input type="number" class="form-control insp_indiv_income" placeholder="" onKeyPress="if(this.value.length==9) return false;" name="insp_fmember_income_m[]">
                  <small class='d-none ruppee_converter' id=""></small>
              </div></div>`;
          $("#insp_family_members_content").append(via_tr);
        });
        family_total_members = family_member_name.length;
        $(".append_insp_occupation").append(occupation_option);
        $(".family_member_name").append(family_info_option);
        $("#system_gen_veh_num").text(
          benef_data.vehicle_reg_number == null
            ? "-NA-"
            : benef_data.vehicle_reg_number
        );
        $("#system_gen_veh_owner").text(
          benef_data.vehicle_owner_name == null
            ? "-NA-"
            : benef_data.vehicle_owner_name
        );
        $("#system_gen_veh_regyear").text(
          benef_data.vehicle_reg_year == null
            ? "-NA-"
            : benef_data.vehicle_reg_year
        );
        //$('#system_gen_veh_type').text(benef_data.vehicle_reg_number== null ? '-NA-' : benef_data.vehicle_reg_number)

        //bank details
        if (benef_data.aeps_bank_name != null) {
          $("#applicant_bank_available").text("ஆம்");
          $("#bank_account_availablitly").val("yes");
          $("#aeps_bank_name").text(
            benef_data.aeps_bank_name == null ? "" : benef_data.aeps_bank_name
          );
        } else if (benef_data.aeps_bank_name == "No") {
          $("#applicant_bank_available").text("இல்லை");
          $("#bank_account_availablitly").val("no");
          $("#applicant_bank_details_no").prop("checked", true);
          $("#applicant_bank_details_no").trigger("click");
        } else {
          $("#applicant_bank_available").text("இல்லை");
          $("#bank_account_availablitly").val("no");
          $("#applicant_bank_details_no").prop("checked", true);
          $("#applicant_bank_details_no").trigger("click");
        }
        //15 to 21
        $("#system_15").text(
          benef_data.govt_emp == null
            ? "தரவு கிடைக்கவில்லை"
            : benef_data.govt_emp
        );
        $("#system_16").text(
          benef_data.govt_pensioner == null
            ? "தரவு கிடைக்கவில்லை"
            : benef_data.govt_pensioner
        );
        $("#system_17").text(
          benef_data.it_gti_mt250k == null
            ? "தரவு கிடைக்கவில்லை"
            : benef_data.it_gti_mt250k
        );
        $("#system_18").text(
          benef_data.prof_tax_mt250k == null
            ? "தரவு கிடைக்கவில்லை"
            : benef_data.prof_tax_mt250k
        );
        $("#system_19").text(
          benef_data.gst_mt50l == null
            ? "தரவு கிடைக்கவில்லை"
            : benef_data.gst_mt50l
        );
        $("#system_20").text("தரவு கிடைக்கவில்லை");
        $("#system_21").text(
          benef_data.sss_pensioner == null
            ? "தரவு கிடைக்கவில்லை"
            : benef_data.sss_pensioner
        );
      }
    },
    error: function (data, textStatus, http) {
      if (data.responseJSON.success == 0) {
        Swal.fire(data.responseJSON.message);
        $("#ration_no_display").append(
          "Applicants family member details not available"
        );
      }
    },
  });
}
function loadreasonicon(val) {
  $("#othersModalPopup").modal("show");
}

function selectMatch(id, val, attrr) {
  let selectBox = $(`${id}`);

  // Select the option by text correctly
  selectBox.find("option").each(function () {
    let optionValue = attrr == "text" ? $(this).text() : $(this).val();
    if (optionValue == val) {
      $(this).prop("selected", true);
    }
  });
}

function getIFSC(api_log_user_id, selected_ifsc = null, bank_name = null) {
  var setbankName = $("#applicant_bank_name").val() || bank_name;

  if (!setbankName) {
    return;
  }
  $.ajax({
    type: "POST",
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": "KMUT Verification App",
    },
    url: config.api_url + "/data_entry/getifsc",
    data: {
      bank_name: $("#applicant_bank_name").val() || bank_name,
      user_id: api_log_user_id,
    },
    dataType: "json",
    success: function (result) {
      var option = `<option value='' disabled selected>Select IFSC</option>`;
      var data = result[0].data.ifsc_list;
      data.forEach(function (select) {
        option += `<option value='${select.ifsccode}'>${select.ifsccode} - ${select.branch_name}</option>`;
      });
      $(".ddl_ifsc_list").selectpicker("destroy");
      $(".ddl_ifsc_list").empty();
      $(".ddl_ifsc_list").append(option);
      $(".ddl_ifsc_list").append('<option value="others">Others</option>');
      $(".ddl_ifsc_list").selectpicker("render");

      if (selected_ifsc != null) {
        const selectBox = $(`.ddl_ifsc_list`); // Select the dropdown
        const normalizedValue = selected_ifsc.trim(); // Normalize the input

        // Find the option that matches the normalized value
        const option = selectBox.find("option").filter(function () {
          return (
            $(this).text().trim() === normalizedValue ||
            $(this).val().trim() === normalizedValue
          );
        });
        if (option.length) {
          option.prop("selected", true); // Mark option as selected
          selectBox.selectpicker("refresh"); // Refresh Bootstrap SelectPicker UI
          // $('#applicant_bank_account_no').removeAttr('disabled');
        } else {
          // $('#applicant_bank_account_no').prop('disabled',true);
        }
      }
    },
  });
}

function disableScreenshot() {
  if (window.AndroidInterface) {
    window.AndroidInterface.updateScreenshotStatus(false);
  }
}

function enableScreenshot() {
  if (window.AndroidInterface) {
    window.AndroidInterface.updateScreenshotStatus(true);
  }
}

function handleModalState() {
  if ($("#infoModal").hasClass("show")) {
    console.log("Modal is open, disabling screenshot");
    disableScreenshot();
  } else {
    console.log("Modal is closed, enabling screenshot");
    enableScreenshot();
  }
}

// Triggered when modal is closed via close button
$("#closeInfoModal").on("click", function () {
  $("#infoModal").modal("hide");
  handleModalState();
});
$("#closeInfoModals").on("click", function () {
  $("#infoModal").modal("hide");
  handleModalState();
});
// Main function to fetch beneficiary info
$("#getBeneficiaryBasicInfo").on("click", function () {
  let ufc_no = localStorage.getItem("ufc_no");
  let appln_id = localStorage.getItem("personalinfo_id");
  let appeal_id = localStorage.getItem("app_id");

  $(".content_div").addClass("d-none");

  // Call #1 — Fetch Application Data
  $.ajax({
    type: "POST",
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": "KMUT Verification App",
    },
    url: config.webapi + "admin_appeal",
    data: {
      case: "get_additional_details",
      ufc_no: ufc_no,
      appln_id: appln_id,
      appeal_id: appeal_id,
    },
    success: function (response) {
      if (response.status == 1) {
        const data = response.data[0].application_data[0];

        $("#span_benif_name").text(data.application_nmae);
        $("#span_benif_mobile_no").text(data.applicant_mobile);
        $("#span_benif_aadhaar").text(data.aadhaar_application);
        $("#span_benif_appln_id").text(data.application_id);
        $("#span_benif_ration_card_no").text(data.ufc_no);

        if (data.unmatched_pds_number) {
          $("#pds_db").show();
          $("#span_benif_unmatched_pds_number").text(data.unmatched_pds_number);
        } else {
          $("#pds_db").hide();
        }

        $("#span_benif_ration_shop_code").text(data.shop_code);
        $("#span_benif_category").text(data.main_category ?? "-");
        $("#span_benif_rejection_reason").text("Insufficient documents provided.");

        $(".rejection_head").toggle(!!data.main_category);

        let familyHeadName = data.application_nmae;
        let family_members = getFamilyDetailsinfo(data.pds_contact_name);

        // Sort: Female first, then by age
        family_members.sort((a, b) => {
          if (a.gender === "Female" && b.gender !== "Female") return -1;
          if (a.gender !== "Female" && b.gender === "Female") return 1;
          return parseInt(a.age) - parseInt(b.age);
        });

        $("#parentDiv").empty();
        family_members.forEach(member => {
          let highlightClass = familyHeadName === member.name ? "bg-highlight text-white rounded p-1" : "";
          let familyHtml = `
            <li class="${highlightClass}">
              ${member.name}
              ${member.age ? " | Age: " + member.age : ""}
              ${member.gender ? " | Gender: " + member.gender : ""}
            </li>
          `;
          $("#parentDiv").append(familyHtml);
        });

        getReasonCategory(data.reason);

        // Show modal and wait for it to finish before handling state
        $("#infoModal").modal("show").on("shown.bs.modal", handleModalState);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error fetching beneficiary info:", error);
      handleModalState();
    },
  });

  // Call #2 — Fetch Rejection Reasons
  $.ajax({
    url: config.webapi + "admin_appeal",
    method: "POST",
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": config.app_name,
    },
    data: {
      ufc_no: ufc_no,
      case: "getRejectionMemberReason",
    },
    dataType: "json",
    success: function (response) {
      if (response.status === 1 && !$.isEmptyObject(response.data)) {
        let values = `
          <div class="row table-responsive">
            <table class="table table-bordered table-striped">
              <thead class="table-light">
                <tr><th>#</th><th>Name</th><th>Icons</th></tr>
              </thead>
              <tbody>
        `;

        response.data.forEach((item, index) => {
          let iconNo = String(item.icon || "");
          let nameHtml = item.membername || "";

          if (iconNo.includes("11") && iconNo.includes("12")) {
            nameHtml = `<strong><i>${nameHtml}</i></strong>`;
          } else if (iconNo.includes("12")) {
            nameHtml = `<strong><i>${nameHtml}</i></strong>`;
          } else if (iconNo.includes("11")) {
            nameHtml = `<strong>${nameHtml}</strong>`;
          }

          let icon = ["11", "12"].includes(iconNo)
            ? `<img src="assets/img/icons/${iconNo}.svg" class="svgicons mx-2" alt="icon">`
            : "";

          nameHtml.split("|").forEach((name, idx) => {
            values += `
              <tr>
                <td>${idx + 1}</td>
                <td>${name.trim()}</td>
                <td>${icon}</td>
              </tr>
            `;
          });
        });

        values += "</tbody></table></div>";
        $(".content_div").html(values).removeClass("d-none");
      }
    },
    error: function () {
      console.error("Error fetching rejection reasons.");
    },
  });
});

function getFamilyDetailsinfo(input) {
  var inputString = input;

  // Split the input string by '|' to separate each person
  var peopleArray = inputString.split("|");

  // Loop through the peopleArray to extract the individual details (name, age, gender)
  var peopleDetails = [];

  peopleArray.forEach(function (person) {
    // Split each person's data by ' - '
    var personDetails = person.split("-");

    // Trim and clean up the data (remove extra spaces)
    var name = personDetails[0].trim();
    var age = personDetails[1].trim();
    var gender = personDetails[2].trim();

    // Store or display the details
    peopleDetails.push({
      name: name,
      age: age,
      gender: gender,
    });
  });
  return peopleDetails;
}

function getReasonCategory(input) {
  var inputText = input;
  $("#dynamicDataContainer").empty().addClass("d-none"); // Clear previous content and hide initially

  if (inputText) {
    // Check if '|' exists before splitting
    var parts = inputText.includes("|||")
      ? inputText.split("|||")
      : [inputText];
    // Loop through each part and display it
    $.each(parts, function (index, part) {
      var trimmedPart = part.trim();
      if (trimmedPart) {
        $("#dynamicDataContainer").append(
          `<p><strong>${index + 1}:</strong> ${trimmedPart}</p>`
        );
      }
    });

    // If content is added, remove d-none to show the alert
    if (parts.length > 0) {
      $("#dynamicDataContainer").removeClass("d-none");
    }
  }
}

function get_details(get_personalinfo_id) {
  $.ajax({
    headers: {
      "X-APP-KEY": config.app_key,
      "X-APP-NAME": "KMUT Verification App",
    },
    url: config.api_url + "/data_entry/get_details",
    type: "POST",
    dataType: "json",
    data: {
      case: "benificiary_survey_officer_details",
      id: get_personalinfo_id,
    },
    success: function (response) {
      var response = response.data.benificiary_survey_officer[0];
      if (response) {
        // For Government Employee Section
        if (response.is_govt_employee) {
          $("#applicant_govt_job_yes").prop("checked", true);
          $(".applicant_govt_job_yes_div").removeClass("d-none");

          selectMatch("#govt_fmember_name", response.govt_employee, "text");
          selectMatch(
            "#govt_fmember_occu",
            response.govt_employment_location,
            "text"
          );
        } else {
          $("#applicant_govt_job_no").prop("checked", true);
        }

        // For Government Pensioner Section
        if (response.is_govt_pensioner) {
          $("#applicant_ex_service_yes").prop("checked", true);
          $(".applicant_ex_service_yes_div").removeClass("d-none");

          selectMatch(
            "#ex_service_fmember_name",
            response.govt_pensioner,
            "text"
          );
          selectMatch(
            "#ex_service_fmember_occu",
            response.govt_pensioner_employment_location,
            "text"
          );
        } else {
          $("#applicant_ex_service_no").prop("checked", true);
        }

        // For Income Tax Payers Section
        if (response.is_income_tax_payers) {
          $("#applicant_income_exceed_yes").prop("checked", true);
          $(".applicant_income_exceed_yes_div").removeClass("d-none");

          selectMatch("#applicant_income_tax_pay", response.tax_payers, "text");
          selectMatch(
            "#applicant_income_tax_file",
            response.tax_filer_name,
            "text"
          );
        } else {
          $("#applicant_income_exceed_no").prop("checked", true);
        }

        // For professtional tax Payers Section
        if (response.is_professional_tax_payers) {
          $("#applicant_pt_yes").prop("checked", true);
          $("#applicant_pt_yes").trigger("click");

          selectMatch(
            "#applicant_pt_fmember_name",
            response.professional_tax_payers,
            "text"
          );
          selectMatch(
            "#applicant_pt_fmember_occu",
            response.professional_tax_payers_occupation,
            "text"
          );
        } else {
          $("#applicant_pt_no").prop("checked", true);
        }

        // For tax above 50L Section
        if (response.is_gst_payers) {
          $("#applicant_gst_yes").prop("checked", true).trigger("click");
          selectMatch(
            "#applicant_gst_fmember_name",
            response.gst_payers,
            "text"
          );
          $("#applicant_gst_gstno").val(response.gst_no);
        } else {
          $("#applicant_gst_no").prop("checked", true);
        }

        // ( ஊராட்சி வார்டு உறுப்பினர்களைத் தவிர) யாரேனும் உள்ளனரா ?
        if (response.is_elected_representatives) {
          $("#applicant_elected_yes").prop("checked", true).trigger("click");
          selectMatch(
            "#applicant_elected_fmember_name",
            response.elected_representative,
            "text"
          );
          selectMatch(
            "#applicant_elected_post",
            response.elected_representatives_position,
            "text"
          );
        } else {
          $("#applicant_elected_no").prop("checked", true);
        }

        // Pension Section
        if (response.is_social_welfare_pensioners) {
          $("#applicant_pension_yes").prop("checked", true).trigger("click");
          selectMatch(
            "#applicant_pension_fmember_name",
            response.social_welfare_pensioner,
            "text"
          );
          selectMatch(
            "#applicant_pension_receiving",
            response.social_welfare_pensioner_scheme,
            "text"
          );
        } else {
          $("#applicant_pension_no").prop("checked", true);
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 400) {
        let response = jqXHR.responseJSON;
        Swal.fire({
          icon: "error",
          title: "Error 400",
          text:
            response && response.message
              ? response.message
              : "Bad Request - No Data Found",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: errorThrown,
        });
      }
    },
    complete: function () {
      $("#preloader").hide();
    },
  });
}

$("#applicant_bank_account_ifsc").on("change", function () {
  $("#applicant_bank_account_no").removeAttr("disabled");
});
