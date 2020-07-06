$(document).ready(function () {
  //=============================================================================
  //Set up variables
  //=============================================================================

  const APIkey = "pC98O4z7UpDQ5zLDKgb82J6PTueCsucX";
  //Search Parameters
  let query;
  let numResults = 0;
  //$("#search");
  let startYear = 0;
  // $("#start-year");
  let endYear = 0;
  // $("#end-year");
  const submitBtn = $("#submit");

  // URL base
  let queryURLbase =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    APIkey;

  //Track num of art
  let articleCounter = 0;

  $("#search-outcomes").css("display", "none");
  //======================================
  //Functions
  //=============================================================================

  function runQuery(numArticles, queryURL) {
    //AJAX Function
    $.ajax({
      url: queryURL,
      method: "GET",
      //object will be stored in NYTData
    }).then(function (NYTData) {
      console.log(queryURL);
      console.log(NYTData);
      console.log(numArticles);

      //clear well
      $("#wellSection").empty();

      for (let i = 0; i < numArticles; i++) {
        //put into HTML
        const wellSection = $("<div>");
        wellSection.addClass("well");
        wellSection.attr("id", "articleWell-" + i);
        $("#wellSection").append(wellSection);

        if (NYTData.response.docs[i].headline != "null") {
          console.log(NYTData.response.docs[i].headline.main);
          $("#articleWell-" + i).append(
            "<h3>" + NYTData.response.docs[i].headline.main + "</h3>"
          );
        }
        if (
          NYTData.response.docs[i].byline &&
          NYTData.response.docs[i].byline.hasOwnProperty("original")
        ) {
          console.log(NYTData.response.docs[i].byline.original);
          $("#articleWell-" + i).append(
            "<h6>" + NYTData.response.docs[i].byline.original + "</h6>"
          );
          $("#articleWell-" + i).append(
            "<h6>" + NYTData.response.docs[i].pub_date + "</h6>"
          );
        }

        //Attach content to approp well
        $("#articleWell-" + i).append(
          "<h6>" + NYTData.response.docs[i].section_name + "</h6>"
        );

        // $("#articleWell-"+i).append("<img src='"+NYTData.response.docs[i].multimedia[0].url+"'>");

        $("#articleWell-" + i).append(
          "<h6>" + NYTData.response.docs[i].abstract + "</h6>"
        );
        $("#articleWell-" + i).append(
          "<a href=" +
            NYTData.response.docs[i].web_url +
            ">" +
            NYTData.response.docs[i].web_url +
            "</a>"
        );

        console.log(NYTData.response.docs[i].headline.main);
        console.log(NYTData.response.docs[i].section_name);
        console.log(NYTData.response.docs[i].pub_date);
        console.log(NYTData.response.docs[i].abstract);
        console.log(NYTData.response.docs[i].web_url);
        console.log(NYTData.response.docs[i].byline.original);
      }
    });
  }

  //======================================
  //Main Process
  //=============================================================================

  $(submitBtn).on("click", function () {
    console.log("Btn works");
    $("#Vector").css("fill", "orange");
    // $("Vector_3").css("fill", "black");
    // $("Vector_4").css("fill", "black");
    // $("Vector-9").css("fill", "black");
    $("#search-outcomes").css("display", "block");
    let searchTerm = $("#search").val().trim();

    //add in search term
    let newURL = queryURLbase + "&q=" + searchTerm;

    //get number of records
    numResults = $("#numRecords").val();

    //get the start Year and endyear
    startYear = $("#start-year").val().trim();
    endYear = $("#end-year").val().trim();

    if (parseInt(startYear)) {
      //add the date infor to the URL
      startYear = startYear + "0101";

      //add date info to url
      newURL = newURL + "&begin_date=" + startYear;
    }

    if (parseInt(endYear)) {
      endYear = endYear + "1231";
      //add date info to url
      newURL = newURL + "&end_sate=" + endYear;
    }

    //add the date info to UEL
    // newURL = newURL + "&begin_date=" +startYear +"&end_date=" +endYear;
    console.log(newURL);

    //send ajax call the new URL
    runQuery(numResults, newURL);
    return false;
  });
});
