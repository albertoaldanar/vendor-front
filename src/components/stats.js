import React, {Component} from "react";
import ChartUsers from "./reusable/chartUsers";
import ChartProduct from "./reusable/chartProduct";
import ChartPrediction from "./reusable/chartPrediction";
import ChartPositions from "./reusable/chartPositions";
import StackedChart from "./reusable/stackedChart";
import ChartTotals from "./reusable/chartTotals";
import CountUp from 'react-countup';
import XLSX from 'xlsx';
import Dropdown from "react-dropdown";
import Table from '@trendmicro/react-table';
import { TablePagination } from '@trendmicro/react-paginations';
import { HashLink as Link } from 'react-router-hash-link';
import Calendar from "./calendar";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-table/dist/react-table.css';
import '@trendmicro/react-paginations/dist/react-paginations.css';

class Stats extends Component{

  constructor(props){
    super(props);
    this.state = {
        ingresosbyMonth: [], egresosByMonth: [], totalEgresos: 0, totalIngresos: 0, month: "",
        egresoQro: [[]], egresoCLN: [[]], egresoMochis: [[]], stopsByClient:[], payByClient: [],
        totalRec: 0, totalRecFail: 0, descargas: 0, incidentes: 0, year: 0, byGroup: []
    }
  }

  componentWillMount(){
      var today = new Date();
      var dd = today.getDate();
      var mm = 1

      var year = new Date().getFullYear()
      return this.getData(mm, year);
  }

  getData(month, year){

      return fetch(`http://localhost:8000/serecsin_data?month=${month}&year=${year}`)
        .then(res => res.json())
        .then(response => {
          console.log(response);
          this.setState({
              ingresosbyMonth: response.ingreso_by_month, egresosByMonth: response.egreso_by_month,
              totalIngresos: response.total_ingresos, totalEgresos: response.total_egresos, 
              month: month, stopsByClient: response.stops_by_client, payByClient: response.pay_by_client,
              egresoCLN: response.egreso_cln, egresoQro: response.egreso_qro, egresoMochis: response.egreso_mochis,
              totalRec: response.total_rec, totalRecFail: response.total_rec_fail, descargas: response.descargas, incidentes: response.incidentes,
              year: year, byGroup: response.by_group, grupoMochis: response.mochis, grupoBonnati: response.bonatti, grupoOxxo: response.oxxo, 
              gastosBonatti: response.gastos_bonatti, gastosOxxo: response.gastos_oxxo, gastosTiendas: response.gastos_tiendas, totalTiendas: response.total_tiendas
          })
        })
  }

  onChange(item){
    this.setState({userSelected: item})
  }

  render(){
    const {incidentes, descargas, totalRec, totalRecFail} = this.state;
    console.log(this.state.year);


    const totalIngresos = this.state.totalIngresos.importe__sum;
    const totalEgresos = this.state.totalEgresos.importe__sum;

    const utilidadNeta = totalIngresos - totalEgresos || 0;
    const roi = (totalIngresos / totalEgresos) || 0;

    const puntoEquilibrio = (totalIngresos / 30) / totalEgresos || 0;

    const options = [
        { value: "Culiacan", label: "Culiacan" },
        { value: "Mochis", label: "Mochis" },
        { value: "Queretaro", label: "Queretaro" }
    ];

    const columns = [
        { dataIndex: 'clientesGanados', title: "Clientes Ganados" },
        { dataIndex: 'clientesPerdidos', title: 'Clientes Perdidos' },
        { dataIndex: 'pedidosWeb', title: 'Pedidos web' },
    ];

    const data = [
            { id: 1, clientesGanados: 'Sushi Factory', clientesPerdidos: 'Oxxo la lomita', pedidosWeb: 5},
            { id: 2, clientesGanados: "Lomita x"},
            { id: 3, clientesGanados: 'Quisco'}
    ]

    const columnRecolección = [
        { dataIndex: 'cliente', title: "Clientes" },
        { dataIndex: 'diasRecolección', title: 'Días de recolección' },
    ];

    const dataRecolección = this.state.stopsByClient.map((x, index) => {
        return {id: index + 1  , cliente: x.client, diasRecolección: x.client__count}
    })

    const columnIndicadores = [
        { dataIndex: 'indicadores', title: "Indicadores" },
        { dataIndex: 'number', title: '#' },
    ];
    
    const dataIndicadores = [
            { id: 1, indicadores: 'Incidentes', number: incidentes},
            { id: 2, indicadores: 'Recolecciones totales', number: totalRec},
            { id: 3, indicadores: "Recolecciones fallidas", number: totalRecFail},
            { id: 4, indicadores: 'Descargas', number: descargas},
            { id: 5, indicadores: 'Recorrido mensual', number: "6597 KM"}

    ];

    return(
      <div className ="page-box">
        <p className = "title" id = "stats">Estadisticas mensuales</p>

        <div className ="card ">
          <Table
            headerClassName ="table-header"
            hoverable
            sortable
            rowKey={record => record.id}
            columns={columns}
            data={data}
          />
        </div>

        <div className ="card">
          <div className ="center">
            <ChartPrediction dataIngresos = {this.state.ingresosbyMonth} dataEgresos = {this.state.egresosByMonth}/>
          </div>
        </div>

        <p> Ventas netas </p>

        <div className ="card">
          <ChartTotals totalEgresos = {totalEgresos} totalIngresos = {totalIngresos} month = {this.state.month}/>
        </div>

        <p className = "title" id = "kpis">Kpi´s Financieros</p>

        <div className ="card">
          <p className ="cardTitle">Utilidad neta</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "$ "
            separator=","
            end={utilidadNeta}
          />
        </div>

        <div className ="card">
          <p className ="cardTitle">Retorno de inversión</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "% "
            separator=","
            end={roi}
          />
        </div>


        <div className ="card">
          <p className ="cardTitle">Tasa de crecimiento</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "% "
            separator=","
            end={22.5}
          />
        </div>


        <div className ="card">
          <p className ="cardTitle">Punto equilibrio (dias)</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "# "
            separator=","
            end={puntoEquilibrio}
          />
        </div>

        <div className ="card">
          <p className ="cardTitle">Costo de financiación</p>
          <CountUp className ="number"
            decimals = {2}
            prefix = "$ "
            separator=","
            end={84560.51}
          />
        </div>

        <p className = "title" id= "clients">Clientes</p>

            <div className ="card">
                <div className ="center">
                  <ChartProduct title = "Desgloce Culiacan" egreso = {this.state.egresoCLN }/>
                </div>
                <div className ="center">
                  <ChartProduct title = "Desgloce Mochis" egreso = {this.state.egresoMochis }/>
                </div>
                <div className ="center">
                  <ChartProduct title = "Desgloce Queretaro" egreso = {this.state.egresoQro }/>
                </div>
            </div>


        <div className ="card ">
          <StackedChart oxxo = {this.state.grupoOxxo} bonatti = {this.state.grupoBonnati} mochis = {this.state.grupoMochis} gastosOxxo = {this.state.gastosOxxo} gastosBonatti= {this.state.gastosBonatti} gastosTiendas = {this.state.gastosTiendas} totalTiendas = {this.state.totalTiendas}/>
        </div>


        <p>Utilidad y perdida por recolección</p>
        <div className ="card ">
              <div className ="center">
                <ChartPositions payByClient = {this.state.payByClient}/>
              </div>
        </div>


       <p className = "title" id= "bus">Recolección del mes</p>
  
        <div className ="card ">
          <div className ="flex-r">
            <Table
              headerClassName ="table-header"
              hoverable
              sortable
              rowKey={record => record.id}
              columns={columnRecolección}
              data={dataRecolección}
            />

            <Table
              headerClassName ="table-header"
              hoverable
              sortable
              rowKey={record => record.id}
              columns={columnIndicadores}
              data={dataIndicadores}
            />
          </div>
        </div>

        <div className = "card">
          <Calendar/>
        </div>
      </div>


    );
  }
}

export default Stats;
