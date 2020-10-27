import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }
  getTotalOwed() {
    // reduce function works on array doing forEach loop to get one value
    this.totalOwed = this.clients.reduce((total, client) => {
      //because balance is considerd string we need to convert it to a number
      return total + parseFloat(client.balance.toString());
    }, 0);
  }
}
