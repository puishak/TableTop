// document.addEventListener('DOMContentLoaded', function() {

//     document.getElementById('editButton').addEventListener('click', () => {

//         chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//             console.log("Edit Button Clicked");
//             alert("Edit Button Clicked");
//             chrome.tabs.sendMessage(tabs[0].id, {action: "edit"});
//         });
//       });    

// });
  
// Popup.js

(function($) {
    'use strict';
  
    // Popup constructor
    function Popup(element, options) {
      this.$element = $(element);
      this.settings = $.extend({}, Popup.defaults, options);
      this.init();
    }
  
    // Popup defaults
    Popup.defaults = {
      trigger: 'click',
      content: '',
      width: 'auto',
      height: 'auto',
      closeButton: true,
      overlay: true,
      animation: 'fade',
      position: 'center',
      onOpen: null,
      onClose: null
    };
  
    // Popup methods
    Popup.prototype = {
      init: function() {
        this.createPopup();
        this.bindEvents();
      },
  
      createPopup: function() {
        this.$popup = $('<div>').addClass('popup');
        this.$popupContent = $('<div>').addClass('popup-content').appendTo(this.$popup);
        
        if (this.settings.closeButton) {
          this.$closeButton = $('<button>').addClass('popup-close').text('×').appendTo(this.$popup);
        }
  
        if (this.settings.overlay) {
          this.$overlay = $('<div>').addClass('popup-overlay');
        }
  
        this.setContent(this.settings.content);
        this.setDimensions();
  
        $('body').append(this.$popup);
        if (this.$overlay) $('body').append(this.$overlay);
      },
  
      bindEvents: function() {
        var self = this;
  
        this.$element.on(this.settings.trigger + '.popup', function(e) {
          e.preventDefault();
          self.open();
        });
  
        if (this.$closeButton) {
          this.$closeButton.on('click.popup', function() {
            self.close();
          });
        }
  
        if (this.$overlay) {
          this.$overlay.on('click.popup', function() {
            self.close();
          });
        }
  
        $(window).on('resize.popup', function() {
          self.setPosition();
        });
      },
  
      setContent: function(content) {
        if (typeof content === 'string') {
          this.$popupContent.html(content);
        } else if (content instanceof jQuery) {
          this.$popupContent.empty().append(content);
        }
      },
  
      setDimensions: function() {
        this.$popup.css({
          width: this.settings.width,
          height: this.settings.height
        });
      },
  
      setPosition: function() {
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            popupHeight = this.$popup.outerHeight(),
            popupWidth = this.$popup.outerWidth();
  
        switch (this.settings.position) {
          case 'center':
            this.$popup.css({
              top: (windowHeight - popupHeight) / 2,
              left: (windowWidth - popupWidth) / 2
            });
            break;
          // Add more positioning cases as needed
        }
      },
  
      open: function() {
        this.setPosition();
        this.$popup.addClass('popup-' + this.settings.animation + ' is-visible');
        if (this.$overlay) this.$overlay.addClass('is-visible');
  
        if (typeof this.settings.onOpen === 'function') {
          this.settings.onOpen.call(this);
        }
      },
  
      close: function() {
        var self = this;
        this.$popup.removeClass('is-visible');
        if (this.$overlay) this.$overlay.removeClass('is-visible');
  
        setTimeout(function() {
          self.$popup.removeClass('popup-' + self.settings.animation);
        }, 200);
  
        if (typeof this.settings.onClose === 'function') {
          this.settings.onClose.call(this);
        }
      },
  
      destroy: function() {
        this.$element.off('.popup');
        this.$popup.remove();
        if (this.$overlay) this.$overlay.remove();
        this.$element.removeData('popup');
      }
    };
  
    // jQuery plugin wrapper
    $.fn.popup = function(options) {
      return this.each(function() {
        if (!$.data(this, 'popup')) {
          $.data(this, 'popup', new Popup(this, options));
        }
      });
    };
  
  })(jQuery);
  