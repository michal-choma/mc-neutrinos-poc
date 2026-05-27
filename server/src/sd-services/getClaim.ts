// _neu_generated_code__dont_modify_directly_
let instance = null;
//CORE_REFERENCE_IMPORTS
//append_imports_start

import cookieParser from 'cookie-parser'; //_splitter_
import { dirname } from 'path'; //_splitter_
import { fileURLToPath } from 'url'; //_splitter_
import { SDBaseService } from '../services/SDBaseService'; //_splitter_
import { TracerService } from '../services/TracerService'; //_splitter_
import log from '../utils/Logger'; //_splitter_
import { GenericRDBMSOperations } from '../utils/ndefault-sql/ExecuteSql/GenericRDBMSOperations'; //_splitter_
//append_imports_end
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class getClaim {
  private sdService = new SDBaseService();
  private tracerService = new TracerService();
  private app;
  private serviceBasePath: string;
  private generatedMiddlewares: Object;
  private serviceName: string;

  private globalTimers: any;
  private constructor(
    app,
    generatedeMiddlewares,
    routeCall,
    middlewareCall,
    globalTimers
  ) {
    this.serviceName = 'getClaim';
    this.app = app;
    this.serviceBasePath = this.app.settings.base;
    this.generatedMiddlewares = generatedeMiddlewares;
    this.globalTimers = globalTimers;
  }

  static getInstance(
    app?,
    generatedeMiddlewares?,
    routeCall?,
    middlewareCall?,
    globalTimers?
  ) {
    if (!instance) {
      instance = new getClaim(
        app,
        generatedeMiddlewares,
        routeCall,
        middlewareCall,
        globalTimers
      );
    }
    instance.mountCalls(routeCall, middlewareCall);
    return instance;
  }

  private mountCalls(routeCall, middlewareCall) {
    if (routeCall) {
      this.mountAllPaths();
      this.mountAllListeners();
    }
    if (middlewareCall) {
      this.generatedMiddlewares[this.serviceName] = {};
      this.mountAllMiddlewares();
      this.mountTimers();
    }
  }

  async mountAllListeners() {
    //append_listeners
  }

  async mountTimers() {
    //appendnew_flow_getClaim_TimerStart
  }

  private mountAllMiddlewares() {
    log.debug('mounting all middlewares for service :: getClaim');
    //appendnew_flow_getClaim_MiddlewareStart
  }

  private mountAllPaths() {
    log.debug('mounting all paths for service :: getClaim');

    this.app['get'](
      `${this.serviceBasePath}/get-claim`,
      cookieParser(),
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'pre',
        this.generatedMiddlewares
      ),

      async (req, res, next) => {
        let bh: any = {};
        try {
          bh = this.sdService.__constructDefault(
            { local: {}, input: {} },
            req,
            res,
            next
          );
          let parentSpanInst = null;
          bh = await this.buildQuery(bh, parentSpanInst);
          //appendnew_next_sd_rD8P2oBXBWreHNps
        } catch (e) {
          return await this.errorHandler(bh, e, 'sd_rD8P2oBXBWreHNps');
        }
      },
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'post',
        this.generatedMiddlewares
      )
    );
    //appendnew_flow_getClaim_HttpIn
  }
  //   service flows_getClaim

  //appendnew_flow_getClaim_start

  async buildQuery(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'buildQuery',
      parentSpanInst
    );
    try {
      bh.local.caseNumber = bh.input.query.case_number;
      bh.local.selectQuery = `
    SELECT * FROM claims WHERE case_number = '${bh.local.caseNumber}' ORDER BY id DESC LIMIT 1
  `;
      this.tracerService.sendData(spanInst, bh);
      bh = await this.getClaimSql(bh, parentSpanInst);
      //appendnew_next_buildQuery
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_aWDTE6LHPKQ28EZ1',
        spanInst,
        'buildQuery'
      );
    }
  }

  async getClaimSql(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'getClaimSql',
      parentSpanInst
    );
    try {
      let configObj = this.sdService.getConfigObj(
        'db-config',
        'sd_NXdLAOeMJCyRLjWN'
      );
      let connectionName;
      if (
        configObj &&
        configObj.hasOwnProperty('dbOption') &&
        configObj.dbOption.hasOwnProperty('name')
      ) {
        connectionName = configObj.dbOption.name;
      } else {
        throw new Error('Cannot find the selected config name');
      }
      let params = [];
      params = params ? params : [];
      bh.local.rawResult = await new GenericRDBMSOperations().executeSQL(
        connectionName,
        bh.local.selectQuery,
        params
      );
      this.tracerService.sendData(spanInst, bh);
      bh = await this.mapResult(bh, parentSpanInst);
      //appendnew_next_getClaimSql
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_7ll15ozuRGYg7Tp2',
        spanInst,
        'getClaimSql'
      );
    }
  }

  async mapResult(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan('mapResult', parentSpanInst);
    try {
      console.log('response', bh.local.rawResult);

      const row = bh.local.rawResult[0];
      bh.local.response = {
        case_number: row.case_number,
        policy_number: row.policy_number,
        vehicle_make: row.vehicle_make,
        vehicle_model: row.vehicle_model,
        vehicle_year: row.vehicle_year,
        reserve_amount: row.reserve_amount,
        liability_pct: row.liability_pct,
        deductible_recovery: row.deductible_recovery,
        recovery_applicable: row.recovery_applicable,
        handler_decision: row.handler_decision,
        handler_remarks: row.handler_remarks,
        decision_status: row.handler_decision === 'approve' ? 'true' : 'false',
        supervisor_decision: row.supervisor_decision,
        supervisor_remarks: row.supervisor_remarks,
        status: row.status,
      };
      this.tracerService.sendData(spanInst, bh);
      await this.out(bh, parentSpanInst);
      //appendnew_next_mapResult
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_QFGvlGppS6v1NUrp',
        spanInst,
        'mapResult'
      );
    }
  }

  async out(bh, parentSpanInst) {
    try {
      bh.web.res.status(200).send(bh.local.response);

      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_BlkPwkMsqJHLbhmX');
    }
  }

  //appendnew_node

  // error_handler_slot
  private async errorHandler(
    bh,
    e,
    src,
    parentSpanInst?,
    functionName?
  ): Promise<any> {
    console.error(e);
    bh.error = e;
    bh.errorSource = src;
    bh.errorFunName = functionName;
    this.tracerService.sendData(parentSpanInst, bh, true);
    if (bh.web.next) {
      bh.web.next(e);
    } else {
      throw e;
    }
  }
  //appendnew_flow_getClaim_Catch
}
