// reloads desk schedules shortly after cron fetch
  function scheduleRefresher(){
      var now,
          cronRefresh = 51,
          halfHourRefresh = cronRefresh - 30, //reloads halfway between cron fetches
          refreshTime,
          delay,
          waitCount = 0;

      function setDelay(){
          now = new Date();
          refreshTime = new Date();
          refreshTime.setSeconds(0);

          if (now.getMinutes() >= cronRefresh){
              refreshTime.setHours(now.getHours() + 1);
              refreshTime.setMinutes(halfHourRefresh);
          } else if (now.getMinutes() >= halfHourRefresh && now.getMinutes() < cronRefresh){
              refreshTime.setMinutes(cronRefresh);
          } else if (now.getMinutes() < halfHourRefresh){
              refreshTime.setMinutes(halfHourRefresh);
          }

          delay = refreshTime - now;

      }// end setDelay

      //make sure it works
      function logs(){
          console.log("Page loaded: " + now);
          console.log("Will refresh: " + refreshTime);
          var totalSeconds = delay/1000,
              seconds = totalSeconds % 60,
              minutes = Math.floor(totalSeconds / 60);
          console.log("Countdown time: " + minutes + " minutes, " + seconds + " seconds");

          //console.log("$(\"#photos\").hasClass(\"on\") =  " + $("#photos").hasClass("on") );
          
      }

      setDelay();
      logs();

      //do it!


      //reset timer if page was recently in use
      function resetWaitCount(){
          waitCount = 0;
          //console.log("waitCount = " + waitCount);
      }
      window.addEventListener("scroll", function(){
          resetWaitCount();
      });

      var photos = document.getElementById("photos");
      photos.addEventListener("click", function(){
          resetWaitCount();
      });
      $("#nav li").click(function(){
          resetWaitCount();
      });
      
      function refreshPage(){
          //console.log('$("li.active a").html() = ' + $("li.active a").html());
          //console.log('$(document).scrollTop() = ' + $(document).scrollTop() );
          

          if( ($("#q").val().length < 1 && $("li.active a").html() == "Today" && $(document).scrollTop() == 0 && $("#photos").hasClass("on") != true ) && $("#lightbox").length == 0 || waitCount >= 60){
              location.reload()
          } else {
              console.log("waiting...");
              waitCount++;
              console.log("waitCount = " + waitCount);
              setTimeout(function(){
                  refreshPage();
              }, 5000);
          }
      }// end refreshPage

      setInterval(function(){ refreshPage() }, delay);

  } // end of schedule refresher

  scheduleRefresher();
