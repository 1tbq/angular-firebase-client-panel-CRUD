import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/Client";
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };
 
  disableBalanceOnAdd: boolean;
  

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService:SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      //show error
      this._flashMessagesService.show("Please enter the valid values", {
        cssClass: "alert-danger",
        timeout: 3000
      });
    } else {
      this.clientService.newClient(value);
      //alert success
      this._flashMessagesService.show("New client added", {
        cssClass: "alert-success",
        timeout: 3000
      });
      this.router.navigate(["/"]);
    }
  }
}
