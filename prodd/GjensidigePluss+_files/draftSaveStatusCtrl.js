define(['Moment', 'Moment_NO'], function() {

    var DraftSaveStatusCtrl = function($scope,$timeout, draftService) {

      var running = false;
      var timesSinceSave = 0;

      $scope.ds = draftService;
      $scope.$watch("ds.timestamp", draftSaved);

      function draftSaved() {
        timesSinceSave = 0;
        if (running) {
          return;
        }
        updateStatusText();
      }

      function updateStatusText() {
        if (draftService.lastSave) {
          running = true;
          timesSinceSave += 1000;
          $scope.lagret = "Sist lagret: " + moment(draftService.lastSave.timestamp).fromNow();
          $timeout(updateStatusText, timesSinceSave);
        }
      }

  };

  return DraftSaveStatusCtrl;
});